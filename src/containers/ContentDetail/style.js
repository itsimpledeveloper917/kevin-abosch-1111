import styled from "styled-components";
import { colors, mixins } from "theme";

export const ContentDetailContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.grayLight};
  display: flex;
  justify-content: center;
  .content-detail-wrapper {
    width: 100%;
    padding: 0px 0 230px;
    .content-detail {
      width: 100%;
      .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${colors.gray};
        padding: 0 64px;
        min-height: 58px;
        .icon-back {
          display: flex;
          justify-content: center;
          align-items: center;
          i {
            font-size: 24px;
            color: ${colors.blueDark};
          }
        }
        h2 {
          margin-left: 24px;
        }
        .btn {
          height: 30px;
          &.btn-plus {
            width: 30px;
            margin-left: 40px;
          }
        }
      }
      .detail-body {
        position: relative;
        padding-top: 118px;
        .alert {
          position: absolute;
          top: 0;
          width: 100%;
          background-color: ${colors.greenLight};
          p {
            b {
              text-decoration: underline;
            }
          }
        }
        .detail-img {
          max-width: calc(100% - 20px);
          margin-right: 20px;
          border-radius: 4px;
        }
        .detail-body-description {
          h1 {
            font-size: 48px !important;
          }
          p {
            color: ${colors.blueDark};
            &.detail-username {
              background: ${colors.orange};
              border-radius: 2px;
              width: fit-content;
              padding: 0px 16px;
            }
            &.see-more {
              color: ${colors.greenDark};
              text-decoration: underline;
            }
          }
          .views-wrapper {
            margin-top: 20px;
            .view-row {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              h5 {
                color: ${colors.blueDark};
                &.total-value {
                  min-width: 90px;
                }
                &.total-views {
                  color: ${colors.greenDark};
                }
              }
            }
          }
          .btns-wrapper {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-top: 12px;
            .btn {
              min-width: auto;
              flex: 1;
              img {
                margin-right: 20px;
              }
            }
          }
          .social-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 200px;
            margin-top: 14px;
          }
        }
      }
    }
  }
  @media (max-width: ${mixins.md}px) {
    .mobile992{display: none;}
    .content-detail-wrapper {
      padding: 0px 0 30px;
      .content-detail {
        .detail-header {
          padding: 0 15px;
        }
        .detail-body {
          padding-top: 24px;
          .detail-img {
            width: 100%;
            height: auto;
            margin-right: 0;
            max-height: unset;
            margin-bottom: 30px;
          }
          .detail-body-description {
            h1 {
              font-size: 32px !important;
            }
            .btns-wrapper-sm {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-top: 12px;
              margin-bottom: 24px;
              .btn {
                flex: 1;
                font-size: 18px !important;
                img {
                  width: 24px;
                  margin-right: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: ${mixins.sm}px) {
    .content-detail-wrapper {
      .content-detail {
        .social-wrapper {
          padding: 0 20px;
          max-width: 100% !important;
        }
      }
    }
    .detail-body-description {
      h1 {
        text-align: center !important;
      }
      p {
        &.detail-username {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }
  }
`;
