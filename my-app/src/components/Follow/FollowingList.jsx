import React, { useEffect, useState } from 'react';
import FollowListItem from './FollowListItem';
import { getUsersByIdsAPI } from '../../services/userService';

const FollowingList = ({ following }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      if (following && following.length > 0) {
        try {
          const ids = following.map(f => f.bloggerId || f.id || f);
          const res = await getUsersByIdsAPI(ids);
          setUsers(res.data?.data || res.data || res);
        } catch (e) {
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    };
    fetchUsers();
  }, [following]);

  if (!users || users.length === 0) {
    return <div className="text-gray-500 p-4 text-center">Bạn chưa theo dõi blogger nào.</div>;
  }

  return (
    <div className="space-y-4">
      {users.map(user => (
        <FollowListItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default FollowingList;
