import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ModalCreateUser.scss";
import { deleteUser } from "../../service/apiService";
// import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
const ModalDeleteUser = (props) => {
  const { show, onHide, dataUpdate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleDeleteUser = async () => {
    let res = await deleteUser(dataUpdate.id);
    if (res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      handleClose();
      props.setCurrentPage(1);
      props.fetchListUserWithPaginate(1); // Directly use fetchListUser here
    }

    if (res.data && res.data.EC !== 0) {
      toast.error(res.data.EM);
    }
  };
  const handleClose = () => {
    onHide();
    setEmail("");
    setUsername("");
    setPassword("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Are you have delete!
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>

        <Button variant="secondary" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalDeleteUser;
