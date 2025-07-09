import React from 'react';
import { Brain, Target, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

const SkillsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            Skill Development
          </Card.Title>
          <Card.Description>
            Track your learning progress across different skills
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="h-64 flex items-center justify-center text-surface-400">
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Skill development tracking coming soon</p>
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Learning Goals
          </Card.Title>
          <Card.Description>
            Set and track your learning objectives
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="h-64 flex items-center justify-center text-surface-400">
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Learning goals feature coming soon</p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SkillsSection;
