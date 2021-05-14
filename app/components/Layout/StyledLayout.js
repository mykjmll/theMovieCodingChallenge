import styled from 'styled-components';

const StyledLayout = styled.div`
  position: relative;

  .wrapper-main {
    position: relative;
    top: 0;
    min-height: 100vh;
    transition: all 0.5s ease;
    background-color: #ffffff;
    color: #000000;
  }

  .main {
    padding: 78px;
    width: 100%;
  }
`;

export default StyledLayout;
