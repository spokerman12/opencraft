import * as React from 'react';
import { Alert, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { WrappedMessage } from 'utils/intl';
import messages from './displayMessages';
import './styles.scss';
import upArrowIcon from 'assets/uparrow.png';

interface ImageUploadFieldProps {
  customUploadMessage: any;
  updateImage: Function;
  clearError: Function;
  parentMessages?: any;
  recommendationTextId?: string;
  error?: string;
  loading?: boolean;
  reset?: Function;
  tooltipTextId?: string;
  tooltipImage?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = (
  props: ImageUploadFieldProps
) => {
  const [show, setShow] = React.useState(false);
  const [image, setImage] = React.useState();

  let file : any = ''
  if (image !== undefined){
    file = image
  }
  const handleClose = () => setShow(false);
  const handleShow = () => {
    props.clearError();
    setShow(true);
  };

  const setImageIfValid = (files: any) => {
    // TODO: Add extension and file validation here
    // Currently the backend handles this
    setImage(files[0]);
    console.log(files[0])
  };

  let tooltip = null;

  if (props.parentMessages && props.tooltipTextId){
    tooltip = (
      <Tooltip className="tooltip" id={props.tooltipTextId}>
        <p>
          <WrappedMessage messages={props.parentMessages} id={props.tooltipTextId} />
        </p>
        { props.tooltipImage && (
          <img
            className='tooltipImage'
            src={props.tooltipImage}
            alt="tooltipImage"
          />
        )}
      </Tooltip>
    );
  }

  return (
    <div className="image-upload-field">
      <div className="componentHeader">
        <h4>{props.customUploadMessage}</h4>
        {tooltip && (
            <OverlayTrigger placement="top" overlay={tooltip}>
              <i className="fas fa-info-circle"></i>
            </OverlayTrigger>
        )}
      </div>
      <Button
        variant="outline-primary"
        size="lg"
        onClick={handleShow}
        disabled={props.loading}
        className="uploadButton"
      >
        <div className='buttonContents'>
          <img
            className='uploadIcon'
            src={upArrowIcon}
            alt="Upload icon"
          />
          <h4>
            <WrappedMessage messages={messages} id="change" />
          </h4>
        </div>
      </Button>
      {props.parentMessages && props.recommendationTextId && (
        <p>
          <WrappedMessage messages={props.parentMessages} id={props.recommendationTextId} />
        </p>
      )}
      <h3>
        { file.name }
      </h3>
      {props.error && (
        <p>
          <Alert className="error-box" variant="danger">
            {props.error}
          </Alert>
        </p>
      )}

      {props.reset !== undefined && (
        <p>
          <button
            className="reset-image"
            type="button"
            onClick={() => {
              // Using `!` because we know this will never be called
              // if props.reset is undefined (this component won't be
              // rendered).
              props.reset!();
            }}
          >
            Remove
          </button>
        </p>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        className="file-upload-modal"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <p>{props.customUploadMessage}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={e => {
              setImageIfValid(e.target.files);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" size="lg" onClick={handleClose}>
            <WrappedMessage id="cancel" messages={messages} />
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              if (image) {
                props.updateImage(image);
              }
              handleClose();
            }}
          >
            <WrappedMessage id="updateImage" messages={messages} />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
