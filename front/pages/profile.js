import Router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const { me } = useSelector(state => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList header="팔로잉 리스트2" data={me.Followers} />
      <FollowList header="팔로워 리스트" data={me.Followings} />
    </AppLayout>
  );
};

export default Profile;
