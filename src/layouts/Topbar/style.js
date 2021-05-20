import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import { colors, mixins } from "theme";

export const TopbarContainer = styled(Navbar)`
  width: 100%;
  background: ${colors.blueDark};
  padding: 0rem 40px;
  min-height: 80px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.16));
  box-shadow: 0px 3px 6px #00000029;
  .navbar-brand {
    position: relative;
    color: ${colors.white};
    .version-beta{
      position: absolute;
      top: 15px;
      right: -20px;
      background-color: ${colors.greenLight};
      color: ${colors.blueDark};
      font-weight: bold;
      font-size: 12px;
      line-height: 11px;
      z-index: -1;
      padding: 3px;
      border-radius: 2px;
    }    
  }
  .navbar-toggler {
    border-color: transparent;
    color: ${colors.white} !important;
  }
  .navbar-collapse {
    .navbar-nav {
      a {
        color: ${colors.white};
        font-weight: 700;
        font-size: 16px;
        align-self: center;
        margin-right: 48px;
        &.btn-nav {
          background: transparent;
          border-radius: 4px;
          color: ${colors.white};
        }
      }
      .btn-nav {
        color: ${colors.white};
        font-weight: 700;
        font-size: 16px;
        align-self: center;
        margin-right: 48px;
        background: transparent;
        border-radius: 4px;
        color: ${colors.white};
      }
      @media (max-width: ${mixins.sm}px) {
        .btn-nav{padding: 7px 0; margin-right: 0px;}
        .dropdown-area{margin: 7px auto;}
      }
    }
    .btns-connect {
      background: #ffffff;
      box-shadow: 0px 2px 4px rgb(0 0 0 / 16%);
      border-radius: 4px;
      padding: 7px 13px;
    }
  }
  @media (max-width: 767px) {
    min-height: 48px;
    padding: 0rem 15px;
    .navbar-brand {
      img {
        height: 38px;
      }
    }
    .navbar-collapse {
      .navbar-nav {
        a {
          margin-left: 0px;
          align-self: flex-start;
          margin-bottom: 5px;
        }
      }
    }
  }
`;
