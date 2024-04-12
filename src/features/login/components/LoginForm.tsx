import {
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { usePostLogin } from '../hooks/usePostLogin';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  closeDrawer: () => void;
};

type Login = {
  username: string;
  password: string;
};

export const LoginForm = ({ closeDrawer }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const toast = useToast();
  const queryClient = useQueryClient();

  const postLoginMutation = usePostLogin({
    onError: (error) => {
      toast({
        id: 'promotion',
        title: 'Error',
        description: error.response?.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    },
    onSuccess: () => {
      toast({
        id: 'promotion',
        title: 'Bienvenido',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      closeDrawer();
      queryClient.refetchQueries();
    },
  });

  const onSubmit = (values: Login) => {
    postLoginMutation.mutate({
      ...values,
    });
  };

  const commonValidation = {
    required: 'Este campo es obligatorio',
    maxLength: {
      value: 50,
      message: 'Solo se permiten 50 caracteres',
    },
    minLength: {
      value: 2,
      message: 'Se requieren 2 caracteres por lo menos',
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        rules={commonValidation}
        name="username"
        control={control}
        render={({ field }) => {
          return (
            <FormControl mb={8} isRequired isInvalid={Boolean(errors.username)}>
              <FormLabel>Nombre de usuario</FormLabel>
              <Input
                focusBorderColor={'primary.500'}
                type="text"
                autoComplete="username"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
              <FormErrorMessage> {errors.username?.message} </FormErrorMessage>
            </FormControl>
          );
        }}
      />

      <Controller
        rules={commonValidation}
        name="password"
        control={control}
        render={({ field }) => {
          return (
            <FormControl mt={8} mb={8} isRequired isInvalid={Boolean(errors.password)}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                colorScheme="primary"
                focusBorderColor={'primary.500'}
                type="password"
                autoComplete="password"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
              <FormErrorMessage> {errors.password?.message} </FormErrorMessage>
            </FormControl>
          );
        }}
      />
      <Center>
        <Button isLoading={false} type="submit">
          Iniciar sesion
        </Button>
      </Center>
    </form>
  );
};
