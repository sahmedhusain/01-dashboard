import { useState } from 'react';
import { Search } from 'lucide-react';
import { useData } from '../../hooks/useData';
import Card from '../ui/Card';
import Loading from '../ui/Loading';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center text-primary-300">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Card.Title>
          <Card.Description>
            Search functionality will be implemented here
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects, audits, or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="material-input pl-10"
              />
            </div>
            <p className="text-surface-400 text-sm">
              Enhanced search functionality with filtering and sorting will be implemented here.
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SearchSection;
