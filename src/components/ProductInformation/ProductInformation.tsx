import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Product } from '../../types/Product';

interface ProductModalProps {
  show: boolean;
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, product, onClose }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={product.thumbnail} alt={product.title} className="img-fluid mb-3" />
        <p>{product.description}</p>
        <h5>Price: ${product.price}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
