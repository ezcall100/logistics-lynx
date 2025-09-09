import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Building2, Users, Bot, X } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'company' | 'user' | 'portal';
  name: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}

interface EnhancedSearchProps {
  onResultClick: (result: SearchResult) => void;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({ onResultClick }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const mockResults: SearchResult[] = [
    { id: '1', type: 'company', name: 'LogiFlow Solutions', subtitle: 'Enterprise Plan • 45 users', icon: Building2 },
    { id: '2', type: 'company', name: 'FleetMax Transport', subtitle: 'Professional Plan • 28 users', icon: Building2 },
    { id: '3', type: 'user', name: 'John Smith', subtitle: 'Admin • LogiFlow Solutions', icon: Users },
    { id: '4', type: 'user', name: 'Sarah Johnson', subtitle: 'Admin • FleetMax Transport', icon: Users },
    { id: '5', type: 'portal', name: 'Broker Portal', subtitle: 'Core TMS • 89 users', icon: Bot },
    { id: '6', type: 'portal', name: 'Carrier Portal', subtitle: 'Core TMS • 67 users', icon: Bot },
  ];

  const filteredResults = query.length > 0 
    ? mockResults.filter(result => 
        result.name.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.length > 0) {
      setIsOpen(true);
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    onResultClick(result);
    setQuery('');
    setIsOpen(false);
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search companies, users, portals..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 z-50 max-h-96 overflow-y-auto"
          >
            {query.length === 0 ? (
              // Recent searches
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Recent Searches</span>
                </div>
                {recentSearches.length > 0 ? (
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentClick(search)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No recent searches</p>
                )}
              </div>
            ) : (
              // Search results
              <div className="p-2">
                {filteredResults.length > 0 ? (
                  <div className="space-y-1">
                    {filteredResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <result.icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{result.name}</p>
                          <p className="text-xs text-gray-500">{result.subtitle}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          result.type === 'company' ? 'bg-blue-100 text-blue-700' :
                          result.type === 'user' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {result.type}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">No results found for "{query}"</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedSearch;
