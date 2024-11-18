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
import { useOpenEditModal } from '../hooks/modal';
import useMessage from '../hooks/message';
import { updatePeopleById, getOnePeopleById } from '../services/people.service';
import useFetch from '../hooks/fetch';
import { calculateAge } from '../utils/calculate-date';
import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import useRecordId from '../hooks/id';

function EditPeopleForm() {
  const { open, setOpen } = useOpenEditModal();
  const { messageApi } = useMessage();
  const { getData } = useFetch();
  const [form] = Form.useForm();
  const { recordId } = useRecordId();

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

    const [message, error] = await updatePeopleById(recordId!, values);

    if (message) {
      messageApi.info(message.message);
      getData();
      handleClose();
    } else {
      messageApi.error(error?.error);
    }
  };

  useEffect(() => {
    if (recordId) {
      (async () => {
        const [data] = await getOnePeopleById<People>(recordId);

        if (data) {
          const values = {
            ...data,
            dateOfBirth: dayjs(data.dateOfBirth, 'DD/MM/YYYY'),
          };

          form.setFieldsValue(values);
        }
      })();
    }
  }, [recordId]);

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={false}
      closeIcon={false}
      destroyOnClose
    >
      <Form
        name="edit"
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
              form.setFieldValue('fullName', `${name} ${surname}`);
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
            Editar
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default EditPeopleForm;
