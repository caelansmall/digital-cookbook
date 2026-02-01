import { useAuth } from './providers/AuthProvider';
import './styling/navbar.css';
import { UserOutlined, FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { App, Button, Col, Drawer, Form, Input, Row, Space, Spin, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import SubmitButton from './components/FormSubmitButton';
import type { User } from './types/user.model';
import { updateUserById } from './services/users.service';

const apiUrl = import.meta.env.VITE_BASE_API;

const Navbar = () => {
  const [open,setOpen] = useState(false);
  const [spinning,setSpinning] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const displayName = user?.username || 'Login';

  const openProfile = () => {
    console.log('opening profile');
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  }

  const onFinish = async (values: User) => {
    setSpinning(true);

    if (!user || !user.id) {
      console.log(user);
      setSpinning(false);
      return;
    }

    const updatedUser = await updateUserById({
        id: user.id,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber
      });

    if(updatedUser && updatedUser >= 0) {
      setSpinning(false);
      message.success("User successfully updated");
      setOpen(false); 
    }
  }

  const queryLogin = async () => {
    console.log('Queueing login...');
    window.location.href = `${apiUrl}/login`;
  }

  const createRecipe = () => {
    navigate("/recipe/create");
  }

  useEffect(() => {
    if (user) {
      form.resetFields();
      form.setFieldsValue({
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        username: user.username ?? undefined,
        email: user.email ?? undefined,
        phoneNumber: user.phoneNumber ?? undefined
      });
    }
  }, [user,form]);

  return (
    <nav className="navbar">

      <div className="navbar-left">

        <Tooltip title="Create recipe">
          <Button 
            className="custom-button"
            shape="round"
            variant="outlined"
            size='large'
            onClick={createRecipe}
            icon={<FileAddOutlined />}
            iconPlacement='end'
            hidden={(user && user.id) ? false : true}  
          ></Button>
        </Tooltip>

      </div>

      <div className="navbar-center">
        <img
          src="/digital_cookbook.svg"
          alt="Digital Cookbook"
          width={190}
          height={35}
          style={{ cursor: 'pointer' }}
          onClick={ () => navigate("/feed")}
        />
      </div>

      <div className="navbar-right">
        <Button 
          className="username"
          onClick={user ? openProfile : queryLogin}
          icon={ <UserOutlined /> }
          iconPlacement='end'
        >
          {displayName}
        </Button>
      </div>

      <Drawer
        title="Profile"
        size='30%'
        onClose={onClose}
        open={open}
        forceRender
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Spin spinning={spinning} fullscreen />
        <Form
          form={form}
          layout='vertical'
          requiredMark={false}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='firstName'
                label='First Name'
                rules={[{ required: true, message: 'First name is required.' }, { max: 64, message: 'First name must be 64 characters or less.'}]}
              >
                <Input placeholder='Enter first name...' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='lastName'
                label='Last Name'
                rules={[{ required: true, message: 'Last name is required.'}, { max: 64, message: 'Last name must be 64 characters or less.' }]}
              >
                <Input placeholder='Enter last name...' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='username'
                label='Username'
                rules={[{ required: true, message: 'Username is required.' }, { max: 128, message: 'Username must be 128 characters or less.' }]}
              >
                <Input disabled placeholder='Enter username...' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='email'
                label='Email'
                rules={[{ required: true, message: 'Email is required.'}, { max: 128, message: 'Email must be 128 characters or less.' }]}
              >
                <Input disabled placeholder='Enter email...' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='phoneNumber'
                label='Phone Number'
                rules={[{ max: 16, message: 'Phone number must be 16 characters or less.' }]}
              >
                <Input placeholder='Enter phone number...' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <SubmitButton
                form={form}
              >Save</SubmitButton>
            </Col>
          </Row>
        </Form>
      </Drawer>

    </nav>

  )
}

export default Navbar;
