'use client';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const CUISINES = [
  'North Indian',
  'Chinese',
  'Fast Food',
  'South Indian',
  'Biryani',
  'Pizza',
  'Italian',
  'Mexican',
  'Continental',
];

export default function CuisineSelector({
  max = 3,
  onChange,
}: {
  max?: number;
  onChange?: (values: string[]) => void;
}) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  //   const [cuisines, setCuisines] = useState(CUISINES)

  const filtered = CUISINES.filter((c) => c.toLowerCase().includes(search.toLowerCase()));

  function toggleCuisine(cuisine: string) {
    let updated: string[];

    if (selected.includes(cuisine)) {
      updated = selected.filter((c) => c !== cuisine);
    } else {
      updated = [...selected, cuisine];
    }

    setSelected(updated);
    onChange?.(updated);
  }

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
            {selected.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => toggleCuisine(item)}
              >
                {item} ✕
              </Badge>
            ))}
          </div>
        )}

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((cuisine) => {
            const active = selected.includes(cuisine);

            return (
              <Button
                key={cuisine}
                type="button"
                variant={active ? 'default' : 'outline'}
                className="justify-start"
                disabled={!active && selected.length >= max}
                onClick={() => toggleCuisine(cuisine)}
              >
                {cuisine}
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
