import styled from "styled-components";
import { colors, mixins } from "theme";

export const FaucetContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  .faucet-wrapper {
    padding: 30px 0 196px;
    .toast {
      max-width: 100%;
      background-color: ${colors.orangeLight};
      .toast-header {
        background-color: ${colors.blueDark};
        color: ${colors.white};
        strong {
          line-height: normal;
        }
      }
      .toast-body {
        color: ${colors.blueDark};
      }
    }
    .faucet-description {
      margin-bottom: 65px;
      @media (max-width: ${mixins.sm}px){
        margin-bottom: 20px;
      }
    }
    .faucet-cards-wrapper {
      .carousel-control-prev,
      .carousel-control-next {
        width: 50px;
      }
      background: ${colors.orangeLight};
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      max-width: 896px;
      margin-left: auto;
      margin-right: auto;
      &.carousel {
        .carousel-control-prev,
        .carousel-control-next {
          display: none;
        }
        .carousel-inner {
          .carousel-item {
            .faucet-step-card {
              position: relative;
              display: flex;
              min-height: 300px;
              // height: 300px;
              align-items: flex-start;
              padding: 43px 152px;
              @media (max-width: ${mixins.sm}px){
                padding: 40px 20px;
              }
              @media (max-width: 480px){
                padding: 30px 15px;
              }
              .icon-back {
                position: absolute;
                left: 10px;
                top: 10px;
                cursor: pointer;
                i {
                  font-size: 24px;
                }
                @media (max-width: ${mixins.sm}px){
                  left: auto;
                  right: 10px;
                  top: 10px;
                }
              }
              h1 {
                line-height: 20px;
              }
              .step-content {
                height: 100%;
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: space-between;
                margin-left: 12px;
                .step-title {
                  font-weight: 600;
                }
                h6 {
                  b {
                    font-weight: 600;
                    text-decoration: underline;
                  }
                }
                p {
                  font-size: 15px !important;
                }
                .btn-step-card {
                  width: 166px;
                  height: 32px;
                  background: ${colors.white};
                  border: 2px solid ${colors.blueDark};
                  box-sizing: border-box;
                  border-radius: 4px;
                  font-style: normal;
                  font-weight: 600;
                  font-size: 16px;
                  line-height: 15px;
                  text-align: center;
                  letter-spacing: 0.03em;
                  color: ${colors.blueDark};
                  margin-bottom: 14px;
                }
                &.has-wallet {
                  justify-content: flex-start;
                  .submit-wrapper {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 50px;
                    .input-address {
                      flex: 1;
                      border: 2px solid ${colors.blueDark};
                      box-sizing: border-box;
                      border-radius: 4px;
                    }
                    .btn-step-card {
                      margin-bottom: 0;
                      margin-left: 28px;
                      background: ${colors.blueDark};
                      color: ${colors.white};
                    }
                  }
                }
                &.congratulation {
                  align-items: center;
                }
              }
            }
          }
        }
        .carousel-indicators {
          margin-bottom: 0px;
          li {
            width: 8px;
            height: 8px;
            border: solid 1px ${colors.redLight};
            border-radius: 50%;
            background-color: transparent;
            margin: 16px 8px;
            opacity: 1;
            &.active {
              background-color: ${colors.redLight} !important;
            }
          }
        }
      }
    }
    .upload-cards-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 20px;
      margin-bottom: 32px;
      @media (max-width: 480px){
        margin-left: -35px;
      }
    }
    .single-ant-file-upload {
      width: 270px;
      height: 152px;
      padding: 8px;
      background: ${colors.grayLight};
      border: 1.5px solid ${colors.blueDark};
      box-sizing: border-box;
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
      border-radius: 4px;
      .ant-upload {
        &.ant-upload-drag {
          background: ${colors.grayLight};
          border: 2px dashed ${colors.greenDark};
          border-radius: 4px;
          &:hover {
            border: 2px dashed ${colors.greenLight};
          }
        }
        .ant-upload-btn {
          padding: 0;
          .uploader-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 24px;
            cursor: pointer;
            .uploader-icon {
              img {
                width: 62px;
                height: 62px;
              }
              i {
                font-size: 20px;
              }
            }
            p {
              font-size: 14px;
            }
            span {
              font-size: 12px;
              opacity: 0.4;
              &.ant-spin-dot {
                opacity: 1;
                font-size: 36px;
              }
            }
          }
        }
      }
    }
  }
`;
