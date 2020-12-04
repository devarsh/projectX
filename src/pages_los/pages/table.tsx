import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// .colCellWrapper {
//     width: 100%;
//     display: flex;
//     align-items: center;
//     background-color: #fff;
//   }
//   .colCell {
//     display: flex;
//     position: relative;
//     padding: 0px 16px;
//     align-items: center;
//     justify-content: flex-start;
//     font-size: 0.875rem;
//     font-weight: 600;
//     cursor: pointer;

//     width: 130px;
//     min-width: 130px;
//     max-width: 130px;
//     max-height: 56px;
//     min-height: 56px;
//   }
//   .colDivider {
//     width: 24px;
//     color: rgba(224, 224, 224, 1);
//     position: absolute;
//     right: -12px;
//     line-height: 56px;
//     display: flex;
//     justify-content: center;
//   }
//   .colDivider svg {
//     line-height: 56px;
//   }
//   .colCellRight {
//     justify-content: flex-end;
//   }

export default function TableDemo() {
  return (
    <div className="colCellWrapper">
      <div className="colCell">
        <div>ID</div>
        <span>
          <ArrowDownwardIcon fontSize="small" />
        </span>
        <div className="colDivider">
          <svg
            className="MuiSvgIcon-root "
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M11 19V5h2v14z"></path>
          </svg>
        </div>
      </div>
      <div className="colCell">
        <div>First name</div>
        <span>
          <ArrowDownwardIcon fontSize="small" />
        </span>
        <div className="colDivider">
          <svg
            className="MuiSvgIcon-root "
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M11 19V5h2v14z"></path>
          </svg>
        </div>
      </div>
      <div className="colCell">
        <div>Last name</div>
        <span>
          <ArrowDownwardIcon fontSize="small" />
        </span>
        <div className="colDivider">
          <svg
            className="MuiSvgIcon-root "
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M11 19V5h2v14z"></path>
          </svg>
        </div>
      </div>
      <div className="colCell colCellRight">
        <div>Age</div>
        <span>
          <ArrowDownwardIcon fontSize="small" />
        </span>
        <div className="colDivider">
          <svg
            className="MuiSvgIcon-root "
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M11 19V5h2v14z"></path>
          </svg>
        </div>
      </div>
      <div className="colCell">
        <div>Full name</div>
        <span>
          <ArrowDownwardIcon fontSize="small" />
        </span>
        <div className="colDivider">
          <svg
            className="MuiSvgIcon-root "
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M11 19V5h2v14z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
