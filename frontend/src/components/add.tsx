import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Select,
} from 'antd';
import { People } from '../types/people';
import nationalities from '../nationalities.json';
import { useOpenAddModal } from '../hooks/modal';
import useMessage from '../hooks/message';
import { createPeople } from '../services/people.service';
import useFetch from '../hooks/fetch';
import { calculateAge } from '../utils/calculate-date';
import { Dayjs } from 'dayjs';

function AddPeopleForm() {
  const { open, setOpen } = useOpenAddModal();
  const { messageApi } = useMessage();
  const { getData } = useFetch();
  const [form] = Form.useForm();

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish: FormProps<People>['onFinish'] = async (fieldsValue) => {
    const values = {
      ...fieldsValue,
      dateOfBirth: (fieldsValue['dateOfBirth'] as any as Dayjs).format(
        'DD/MM/YYYY'
      ),
    };

    const response = await createPeople(values);
    messageApi.success(response.message);
    getData();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={false}
      closeIcon={false}
      destroyOnClose
    >
      <Form
        name="add"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        preserve={false}
      >
        <Form.Item<People>
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Este campo es requerido.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<People>
          label="Apellido"
          name="surname"
          rules={[{ required: true, message: 'Este campo es requerido.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<People>
          label="Nombre completo"
          name="fullName"
          rules={[{ required: true, message: 'Este campo es requerido.' }]}
        >
          <Input
            onFocus={() => {
              const { name, surname } = form.getFieldsValue();
              if (name && surname) {
                form.setFieldValue('fullName', `${name} ${surname}`);
              }
            }}
          />
        </Form.Item>
        <Form.Item<People>
          label="Fecha de nacimiento"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Este campo es requerido.' }]}
        >
          <DatePicker
            format="DD/MM/YYYY"
            className="w-full"
            onChange={(_, dateString) => {
              const age = calculateAge(dateString as string);

              form.setFieldValue('age', age);
            }}
          />
        </Form.Item>
        <Form.Item<People>
          label="Nacionalidad"
          name="nationality"
          rules={[{ required: true, message: 'Este campo es requerido.' }]}
        >
          <Select
            options={nationalities}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
        <Form.Item<People>
          label="Edad"
          name="age"
          rules={[{ required: true, message: 'Este campo es requerido.' }]}
        >
          <InputNumber className="w-full" />
        </Form.Item>
        <div className="flex justify-end items-center gap-4">
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="primary" htmlType="submit">
            Añadir
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddPeopleForm;
