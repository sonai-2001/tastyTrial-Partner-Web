'use client';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface CuisineOption {
  _id: string;
  name: string;
}

export default function CuisineSelector({
  max = 3,
  values = [],
  options = [],
  onChange,
}: {
  max?: number;
  values?: string[];
  options?: CuisineOption[];
  onChange?: (values: string[]) => void;
}) {
  const [search, setSearch] = useState('');
  const selected = values;

  const filtered = options.filter((c) => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  function toggleCuisine(cuisineId: string) {
    if (onChange) {
      if (selected.includes(cuisineId)) {
        onChange(selected.filter((id) => id !== cuisineId));
      } else if (selected.length < max) {
        onChange([...selected, cuisineId]);
      }
    }
  }

  const getCuisineName = (id: string) => {
    return options.find(o => o._id === id)?.name || id;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Select upto {max} cuisines</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your restaurant will appear in searches for these cuisines
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <Input
          placeholder="Search for cuisines"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Selected */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selected.map((id) => (
              <Badge
                key={id}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleCuisine(id)}
              >
                {getCuisineName(id)} ✕
              </Badge>
            ))}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((cuisine) => {
            const active = selected.includes(cuisine._id);

            return (
              <Button
                key={cuisine._id}
                type="button"
                variant={active ? 'default' : 'outline'}
                className="justify-start truncate"
                disabled={!active && selected.length >= max}
                onClick={() => toggleCuisine(cuisine._id)}
                title={cuisine.name}
              >
                {cuisine.name}
              </Button>
            );
          })}
        </div>

        {/* Counter */}
        <p className="text-xs text-muted-foreground text-right">
          {selected.length}/{max} selected
        </p>
      </CardContent>
    </Card>
  );
}
