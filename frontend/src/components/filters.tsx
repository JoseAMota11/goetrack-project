import { DatePicker, Input, Select } from 'antd';
import nationalities from '../nationalities.json';
import useFetch from '../hooks/fetch';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';
import { Filters as FiltersType } from '../types/filters';

function Filters() {
  const { getData } = useFetch();

  const debouncedGetData = useCallback(
    debounce((key: keyof FiltersType, value) => {
      getData({ [key]: value });
    }, 400),
    []
  );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-2 [&>div>*:not(h4)]:w-full">
      <div>
        <h4>Nombre completo</h4>
        <Input
          placeholder="Ej: José Mota"
          onChange={(e) => debouncedGetData('fullName', e.target.value)}
        />
      </div>
      <div>
        <h4>Fecha de nacimiento</h4>
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Seleccione una fecha"
          onChange={(_, dateString) =>
            debouncedGetData('dateOfBirth', dateString)
          }
        />
      </div>
      <div>
        <h4>Nacionalidad</h4>
        <Select
          options={nationalities}
          placeholder="Dominican"
          showSearch
          allowClear
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          onSelect={(value) => debouncedGetData('nationality', value)}
          onClear={() => debouncedGetData('nationality', undefined)}
        />
      </div>
    </div>
  );
}

export default Filters;
