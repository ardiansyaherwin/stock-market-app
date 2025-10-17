"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from "react-hook-form";
import countryList from "react-select-country-list";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type CountrySelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: FieldError;
  required?: boolean;
};

interface CountryOption {
  value: string;
  label: string;
}

// Helper function to get flag emoji - moved outside component to avoid recreating
const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const CountryItem = memo(
  ({
    country,
    isSelected,
    onSelect,
  }: {
    country: CountryOption;
    isSelected: boolean;
    onSelect: (value: string) => void;
  }) => {
    const handleSelect = useCallback(() => {
      onSelect(country.value);
    }, [country.value, onSelect]);

    return (
      <CommandItem
        key={country.value}
        value={`${country.label} ${country.value}`}
        onSelect={handleSelect}
        className="country-select-item"
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4 text-yellow-500",
            isSelected ? "opacity-100" : "opacity-0",
          )}
        />
        <span className="flex items-center gap-2">
          <span>{getFlagEmoji(country.value)}</span>
          <span>{country.label}</span>
        </span>
      </CommandItem>
    );
  },
);

CountryItem.displayName = "CountryItem";

const CountrySelect = memo(
  ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    const [open, setOpen] = useState(false);

    // Memoize countries list to avoid recreating on every render
    const countries = useMemo(() => countryList().getData(), []);

    // Memoize selected country to avoid recalculating
    const selectedCountry = useMemo(
      () => countries.find((c) => c.value === value),
      [countries, value],
    );

    // Memoize the select handler to avoid recreating on every render
    const handleSelect = useCallback(
      (countryValue: string) => {
        onChange(countryValue);
        setOpen(false);
      },
      [onChange],
    );

    // Memoize the open state handler
    const handleOpenChange = useCallback((newOpen: boolean) => {
      setOpen(newOpen);
    }, []);

    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="country-select-trigger"
          >
            {selectedCountry ? (
              <span className="flex items-center gap-2">
                <span>{getFlagEmoji(value)}</span>
                <span>{selectedCountry.label}</span>
              </span>
            ) : (
              "Select your country..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 bg-gray-800 border-gray-600"
          align="start"
        >
          <Command className="bg-gray-800 border-gray-600">
            <CommandInput
              placeholder="Search countries..."
              className="country-select-input"
            />
            <CommandEmpty className="country-select-empty">
              No country found.
            </CommandEmpty>
            <CommandList className="max-h-60 bg-gray-800 scrollbar-hide-default">
              <CommandGroup className="bg-gray-800">
                {countries.map((country) => (
                  <CountryItem
                    key={country.value}
                    country={country}
                    isSelected={value === country.value}
                    onSelect={handleSelect}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

CountrySelect.displayName = "CountrySelect";

export const SelectFieldCountry = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps<T>) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <CountrySelect value={field.value} onChange={field.onChange} />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <p className="text-xs text-gray-500">
        Helps us show market data and news relevant to you.
      </p>
    </div>
  );
};
