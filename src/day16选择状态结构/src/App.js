import { Fragment } from 'react';
import { useImmer } from 'use-immer';

import MovingDot from './MovingDot'; // 组相关状态

import FeedbackForm from './FeedbackForm'; // 避免状态矛盾

import RedundancyForm from './RedundancyForm'; // 避免冗余状态

import Menu from './Menu' // 避免状态重复

export default function App() {
  return (
    // <MovingDot />
    // <FeedbackForm /> 
    // <RedundancyForm initialColor="red" />
    <Menu />
  )
}