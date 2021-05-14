import styled from 'styled-components';
import { IMAGE_BASE_URL } from '../../utils/constants';

export const StyledTop1Movie = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  height: 500px;
  background: url(${props => IMAGE_BASE_URL + props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  h1.ant-typography {
    color: #ffffff;
    text-shadow: 2px 2px 2px #000000;
    text-transform: uppercase;
  }

  .footer {
    padding-bottom: 50px;
    .subtitle {
      padding: 20px 0;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #ff0000;
      text-shadow: 1px 1px 0px #000000;
    }
  }

  button {
    width: 160px;
  }
`;
