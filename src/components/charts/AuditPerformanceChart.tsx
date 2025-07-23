import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'

interface AuditData {
  month: string
  auditsGiven: number
  auditsReceived: number
  avgGradeGiven: number
  avgGradeReceived: number
  ratio: number
}

interface AuditPerformanceChartProps {
  data: AuditData[]
  width?: number
  height?: number
}

const AuditPerformanceChart: React.FC<AuditPerformanceChartProps> = ({ 
  data, 
  width = 600, 
  height = 300 
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!data.length || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 80, bottom: 40, left: 60 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Create scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, innerWidth])
      .padding(0.1)

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.auditsGiven, d.auditsReceived)) || 0])
      .range([innerHeight, 0])

    const ratioScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.ratio) as [number, number])
      .range([innerHeight, 0])

    // Create main group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Add bars for audits given
    g.selectAll(".bar-given")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-given")
      .attr("x", d => xScale(d.month)!)
      .attr("width", xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.auditsGiven))
      .attr("height", d => innerHeight - yScale(d.auditsGiven))
      .attr("fill", "#10B981")
      .attr("opacity", 0.8)

    // Add bars for audits received
    g.selectAll(".bar-received")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-received")
      .attr("x", d => xScale(d.month)! + xScale.bandwidth() / 2)
      .attr("width", xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.auditsReceived))
      .attr("height", d => innerHeight - yScale(d.auditsReceived))
      .attr("fill", "#3B82F6")
      .attr("opacity", 0.8)

    // Add ratio line
    const line = d3.line<AuditData>()
      .x(d => xScale(d.month)! + xScale.bandwidth() / 2)
      .y(d => ratioScale(d.ratio))
      .curve(d3.curveMonotoneX)

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#F59E0B")
      .attr("stroke-width", 3)
      .attr("d", line)

    // Add ratio dots
    g.selectAll(".ratio-dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "ratio-dot")
      .attr("cx", d => xScale(d.month)! + xScale.bandwidth() / 2)
      .attr("cy", d => ratioScale(d.ratio))
      .attr("r", 4)
      .attr("fill", "#F59E0B")
      .attr("stroke", "#D97706")
      .attr("stroke-width", 2)

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")

    // Add left Y axis (for audit counts)
    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")

    // Add right Y axis (for ratio)
    g.append("g")
      .attr("transform", `translate(${innerWidth},0)`)
      .call(d3.axisRight(ratioScale))
      .selectAll("text")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")

    // Style axes
    g.selectAll(".domain, .tick line")
      .attr("stroke", "#374151")

    // Add legends
    const legend = g.append("g")
      .attr("transform", `translate(${innerWidth + 10}, 20)`)

    legend.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#10B981")

    legend.append("text")
      .attr("x", 16)
      .attr("y", 10)
      .attr("fill", "#E5E7EB")
      .style("font-size", "11px")
      .text("Given")

    legend.append("rect")
      .attr("y", 20)
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", "#3B82F6")

    legend.append("text")
      .attr("x", 16)
      .attr("y", 30)
      .attr("fill", "#E5E7EB")
      .style("font-size", "11px")
      .text("Received")

    legend.append("line")
      .attr("y1", 45)
      .attr("y2", 45)
      .attr("x1", 0)
      .attr("x2", 12)
      .attr("stroke", "#F59E0B")
      .attr("stroke-width", 3)

    legend.append("text")
      .attr("x", 16)
      .attr("y", 49)
      .attr("fill", "#E5E7EB")
      .style("font-size", "11px")
      .text("Ratio")

    // Add axis labels
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (innerHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")
      .text("Audit Count")

    g.append("text")
      .attr("transform", `translate(${innerWidth + margin.right - 10}, ${innerHeight / 2}) rotate(90)`)
      .style("text-anchor", "middle")
      .attr("fill", "#9CA3AF")
      .style("font-size", "12px")
      .text("Audit Ratio")

  }, [data, width, height])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 text-white/60">
        <p>No audit performance data available</p>
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
        <h4 className="text-lg font-semibold text-white mb-2">Audit Performance Trends</h4>
        <p className="text-white/60 text-sm">Monthly audit activity and ratio analysis</p>
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

export default AuditPerformanceChart
