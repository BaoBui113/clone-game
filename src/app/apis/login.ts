import { FormLoginType } from '@/components/Home/components/FormLogin';
import { customFetch } from '@/utils/customFetch';
// Login Function
export const login = async (data: FormLoginType) => {
  return await customFetch('/v2/login', {
    method: 'POST',
    body: JSON.stringify({
      username: data.username,
      password: data.password,
      brand_id: 3,
    }),
  });
};
