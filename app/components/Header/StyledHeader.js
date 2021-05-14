import styled from 'styled-components';

const StyledHeader = styled.div`
  position: absolute;
  top: 0;
  height: 78px;
  padding: 20px 40px 20px 20px;
  z-index: 150;
  width: 100vw;
  background: darkslategrey;
  opacity: 0.5;

  .icon__search {
    font-size: 0px;
    background: transparent;
  }
`;

export default StyledHeader;
