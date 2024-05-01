import { useNavigate } from 'react-router-dom';
import { useGetProfile } from '../../../global/hooks/useGetProfile';
import { useEffect } from 'react';
import { routes } from '../../../constants';
import { useGetFindPromoter } from '../../promoters';

export const Redirector = () => {
  const navigate = useNavigate();
  const profile = useGetProfile();
  const promoterQuery = useGetFindPromoter({
    citizenId: profile?.citizenId ?? '',
  });

  useEffect(() => {
    if (promoterQuery.isSuccess) {
      if (profile?.role === 'admin') {
        navigate(routes.watchTower);
      } else if (profile?.role === 'promoter') {
        navigate(routes.promoterProfile.replace(':promoterId', promoterQuery.data.data.id));
      }
    }
  }, [navigate, profile?.role, promoterQuery]);
  return <></>;
};
