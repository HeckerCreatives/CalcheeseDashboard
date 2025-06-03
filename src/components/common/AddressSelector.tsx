'use client';

import React, { useEffect, useState } from 'react';
import { Region, Province, City, Barangay } from '@/types/address';
import regionData from '@/data/region.json';
import provinceData from '@/data/province.json';
import cityData from '@/data/city.json';
import barangayData from '@/data/barangay.json';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Props interface for passing selected address to parent
interface PhilippinesAddressSelectorProps {
  onAddressChange?: (address: {
    region: string;
    province: string;
    city: string;
    barangay: string;
  }) => void;
}

const regions = regionData as Region[];
const provinces = provinceData as Province[];
const cities = cityData as City[];
const barangays = barangayData as Barangay[];

const PhilippinesAddressSelector: React.FC<PhilippinesAddressSelectorProps> = ({
  onAddressChange,
}) => {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  const [filteredProvinces, setFilteredProvinces] = useState<Province[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [filteredBarangays, setFilteredBarangays] = useState<Barangay[]>([]);

  const notifyParent = () => {
  const regionName = regions.find(r => r.region_code === selectedRegion)?.region_name ?? '';
  const provinceName = provinces.find(p => p.province_code === selectedProvince)?.province_name ?? '';
  const cityName = cities.find(c => c.city_code === selectedCity)?.city_name ?? '';
  const barangayName = barangays.find(b => b.brgy_code === selectedBarangay)?.brgy_name ?? '';

  if (onAddressChange) {
    onAddressChange({
      region: regionName,
      province: provinceName,
      city: cityName,
      barangay: barangayName,
    });
  }
};



 const handleRegionChange = (regionCode: string) => {
  setSelectedRegion(regionCode);
  const newProvinces = provinces.filter(p => p.region_code === regionCode);
  setFilteredProvinces(newProvinces);
  setFilteredCities([]);
  setFilteredBarangays([]);
  setSelectedProvince('');
  setSelectedCity('');
  setSelectedBarangay('');
  // Let useEffect trigger notifyParent once state updates, OR trigger it after updates
};

const handleProvinceChange = (provinceCode: string) => {
  setSelectedProvince(provinceCode);
  const newCities = cities.filter(c => c.province_code === provinceCode);
  setFilteredCities(newCities);
  setFilteredBarangays([]);
  setSelectedCity('');
  setSelectedBarangay('');
  notifyParent(); // ✅ uses internal state
};

const handleCityChange = (cityCode: string) => {
  setSelectedCity(cityCode);
  const newBarangays = barangays.filter(b => b.city_code === cityCode);
  setFilteredBarangays(newBarangays);
  setSelectedBarangay('');
  notifyParent(); // ✅ uses internal state
};

const handleBarangayChange = (brgyCode: string) => {
  setSelectedBarangay(brgyCode);
  notifyParent(); // ✅ uses internal state
};

useEffect(() => {
  notifyParent();
}, [selectedRegion, selectedProvince, selectedCity, selectedBarangay]);



  return (
    <div className="space-y-2 w-full bg-orange-100 p-2 rounded-md">
      <h3 className="text-xs font-semibold">Address</h3>

      <div className="w-full grid grid-cols-2 items-center gap-2 md:gap-4">
        {/* Region */}
        <div className="w-full">
          <label className="block font-medium text-xs">Region</label>
          <Select value={selectedRegion} onValueChange={handleRegionChange}>
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region.region_code} value={region.region_code}>
                  {region.region_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Province */}
        <div className="w-full">
          <label className="block font-medium text-xs">Province</label>
          <Select
            value={selectedProvince}
            onValueChange={handleProvinceChange}
            disabled={!filteredProvinces.length}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              {filteredProvinces.map(province => (
                <SelectItem key={province.province_code} value={province.province_code}>
                  {province.province_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 items-center gap-2 md:gap-4">
        {/* City */}
        <div className="w-full">
          <label className="block font-medium text-xs">City/Municipality</label>
          <Select
            value={selectedCity}
            onValueChange={handleCityChange}
            disabled={!filteredCities.length}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {filteredCities.map(city => (
                <SelectItem key={city.city_code} value={city.city_code}>
                  {city.city_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Barangay */}
        <div className="w-full">
          <label className="block font-medium text-xs">Barangay</label>
          <Select
            value={selectedBarangay}
            onValueChange={handleBarangayChange}
            disabled={!filteredBarangays.length}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue placeholder="Select Barangay" />
            </SelectTrigger>
            <SelectContent>
              {filteredBarangays.map(barangay => (
                <SelectItem key={barangay.brgy_code} value={barangay.brgy_code}>
                  {barangay.brgy_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Selected Address Display */}
      {/* <div className="mt-4 text-sm text-gray-700">
        <strong>Selected Address:</strong><br />
        {selectedBarangay && barangays.find(b => b.brgy_code === selectedBarangay)?.brgy_name},&nbsp;
        {selectedCity && cities.find(c => c.city_code === selectedCity)?.city_name},&nbsp;
        {selectedProvince && provinces.find(p => p.province_code === selectedProvince)?.province_name},&nbsp;
        {selectedRegion && regions.find(r => r.region_code === selectedRegion)?.region_name}
      </div> */}
    </div>
  );
};

export default PhilippinesAddressSelector;
