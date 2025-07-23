import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

interface XPDataPoint {
  date: string
  xp: number
  cumulativeXP: number
  project?: string
  type?: string
}

interface XPProgressionChartProps {
  data: XPDataPoint[]
  width?: number
  height?: number
}

const XPProgressionChart: React.FC<XPProgressionChartProps> = ({ 
  data, 
  width = 800, 
  height = 400 
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!data.length || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.cumulativeXP) || 0])
      .range([innerHeight, 0])

    // Create main group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Add gradient definition
    const defs = svg.append("defs")
    const gradient = defs.append("linearGradient")
      .attr("id", "xpGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", innerHeight)
      .attr("x2", 0).attr("y2", 0)

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#3B82F6")
      .attr("stop-opacity", 0.1)

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#3B82F6")
      .attr("stop-opacity", 0.8)

    // Create line generator
    const line = d3.line<XPDataPoint>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.cumulativeXP))
      .curve(d3.curveMonotoneX)

    // Create area generator
    const area = d3.area<XPDataPoint>()
      .x(d => xScale(new Date(d.date)))
      .y0(innerHeight)
      .y1(d => yScale(d.cumulativeXP))
      .curve(d3.curveMonotoneX)

    // Add area
    g.append("path")
      .datum(data)
      .attr("fill", "url(#xpGradient)")
      .attr("d", area)

    // Add line
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", 3)
      .attr("d", line)

    // Add dots for data points
    g.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", d => xScale(new Date(d.date)))
      .attr("cy", d => yScale(d.cumulativeXP))
      .attr("r", 4)
      .attr("fill", "#3B82F6")
      .attr("stroke", "#1E40AF")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        // Tooltip
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 6)

        const tooltip = g.append("g")
          .attr("id", "tooltip")

        const tooltipBg = tooltip.append("rect")
          .attr("x", xScale(new Date(d.date)) + 10)
          .attr("y", yScale(d.cumulativeXP) - 40)
          .attr("width", 160)
          .attr("height", 60)
          .attr("fill", "#1F2937")
          .attr("stroke", "#374151")
          .attr("rx", 6)
          .attr("opacity", 0.95)

        tooltip.append("text")
          .attr("x", xScale(new Date(d.date)) + 90)
          .attr("y", yScale(d.cumulativeXP) - 20)
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .attr("fill", "#E5E7EB")
          .text(d.project || "XP Gain")

        tooltip.append("text")
          .attr("x", xScale(new Date(d.date)) + 90)
          .attr("y", yScale(d.cumulativeXP) - 5)
          .attr("text-anchor", "middle")
          .attr("font-size", "11px")
          .attr("fill", "#9CA3AF")
          .text(`+${(d.xp / 1000).toFixed(0)}kB XP`)

        tooltip.append("text")
          .attr("x", xScale(new Date(d.date)) + 90)
          .attr("y", yScale(d.cumulativeXP) + 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "10px")
          .attr("fill", "#6B7280")
          .text(new Date(d.date).toLocaleDateString())
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 4)

        g.select("#tooltip").remove()
      })

    // Add X axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%b %d"))
      .ticks(6)

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")

    g.selectAll(".domain, .tick line")
      .attr("stroke", "#374151")

    // Add Y axis
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d => `${(d as number / 1000).toFixed(0)}kB`)
      .ticks(5)

    g.append("g")
      .call(yAxis)
      .selectAll("text")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")

    g.selectAll(".domain, .tick line")
      .attr("stroke", "#374151")

    // Add axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (innerHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")
      .text("Cumulative XP")

    g.append("text")
      .attr("transform", `translate(${innerWidth / 2}, ${innerHeight + margin.bottom})`)
      .style("text-anchor", "middle")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")
      .text("Date")

  }, [data, width, height])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 text-white/60">
        <p>No XP progression data available</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-white mb-2">XP Progression Over Time</h4>
        <p className="text-white/60 text-sm">Interactive chart showing your learning journey</p>
      </div>
      <div className="bg-gray-800/50 rounded-lg p-4 overflow-x-auto">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  )
}

export default XPProgressionChart
