'use client';

import { Profile } from '@/@types/profile';
import React, { useEffect } from 'react';
import { getAllProfileService } from '@/services/profile';
import Image from 'next/image';

export default function Home() {
  const [profile, setProfile] = React.useState<Profile[]>([]);
  const [profilePhoto, setProfilePhoto] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await getAllProfileService();
      if (res) {
        setProfile(res);
        if (res[0].data) {
          const buffer = Buffer.from(res[0].data);
          const base64String = buffer.toString('base64');
          const imageUrl = `data:image/jpeg;base64,${base64String}`;
          setProfilePhoto(imageUrl);
        }
      }
    } catch (error) {
      throw new Error('Error fetching profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="my-10">
      {!isLoading && profilePhoto && (
        <div className="flex items-center justify-center">
          <Image src={profilePhoto} alt="profile" width={600} height={600} />
        </div>
      )}
    </div>
  );
}
