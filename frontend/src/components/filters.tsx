import { DatePicker, Input, Select } from 'antd';
import nationalities from '../nationalities.json';
import useFetch from '../hooks/fetch';

function Filters() {
  const { getData } = useFetch();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-2 [&>div>*:not(h4)]:w-full">
      <div>
        <h4>Nombre completo</h4>
        <Input
          placeholder="Ej: José Mota"
          onChange={(e) => getData({ fullName: e.target.value })}
        />
      </div>
      <div>
        <h4>Fecha de nacimiento</h4>
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Seleccione una fecha"
          onChange={(_, dateString) =>
            getData({ dateOfBirth: dateString as string })
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
          onSelect={(value) => getData({ nationality: value })}
          onClear={() => getData({ nationality: undefined })}
        />
      </div>
    </div>
  );
}

export default Filters;
