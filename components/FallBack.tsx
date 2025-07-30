


import React from 'react'
import SpaceLoadingScreen from './LoadingScreen';

export default function FallBack({children , loading}: {children: React.ReactNode , loading: boolean}) {
    if (loading) {
        return <SpaceLoadingScreen fullScreen />;
      }
  return (<>{children}</>)
}
