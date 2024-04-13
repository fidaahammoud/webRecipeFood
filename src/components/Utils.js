import React from 'react';

export const Utils = () => {
  const getTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const difference = currentTime - createdTime;

    const minutes = Math.floor(difference / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else {
      return `${minutes} mins ago`;
    }
  };

  return { getTimeDifference };
};
