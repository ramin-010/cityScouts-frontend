import { styleEffect } from 'framer-motion';
import { Children } from 'react';
import styled from 'styled-components';

export const StyledWrapper = styled.div`
  .card {
    position: relative;
    width: 250px;
    height: 150px;
    background-color: #b9dbe0; /* light teal background */
    border-radius: 10px;
    overflow: hidden;
    perspective: 1000px;
    box-shadow: 0 0 0 0px #ffffff80;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  .card__icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  }

  .card__content {
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px;
    width: 100%;
    height: 100%;
    background-color: #e4f1f3;
    transform: rotateX(-90deg);
    transform-origin: bottom;
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 10px;
  }

  .card:hover .card__content {
    transform: rotateX(0deg);
  }

  .card:hover .card__icon {
    scale: 0;
  }

  .card__title {
    font-size: 18px;
    font-weight: 700;
    color: #0b4148; /* dark teal for strong contrast */
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .card__description {
    font-size: 13px;
    color: #23484d; /* muted dark text */
    margin-bottom: 6px;
  }

  .card__location {
    font-size: 12px;
    color: #38d9a9; /* bright teal accent */
    font-weight: 500;
  }
`;
