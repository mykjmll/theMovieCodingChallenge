import styled from 'styled-components';
import { IMAGE_BASE_URL } from '../../utils/constants';

export const StyledMovie = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: right;
  height: 100vh;
  background: url(${props => IMAGE_BASE_URL + props.src});
  background-position: right;
  background-repeat: no-repeat;
  background-size: auto;

  h1.ant-typography {
    color: #ffffff;
  }

  .footer {
    padding-bottom: 50px;
    .subtitle {
      padding: 20px 0;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      color: #ff0000;
    }
  }

  button {
    width: 160px;
  }
`;
