import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory } from '../../actions/index.js'
import Layout from '../../components/layout'
import { Input } from '../../components/UI/Input/index.js'

const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const handleClose = () => {
        const form = new FormData();
        console.log("categoryName,parentCategoryId,categoryImage",{categoryName,parentCategoryId,categoryImage});
        form.append('name',categoryName);
        form.append('parentId',parentCategoryId);
        form.append('categoryImage',categoryImage);
        for (var key of form.entries()) {
			console.log("pppppppppppp========",key[0] + ', ' + key[1])
		}
        dispatch(addCategory(form));
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;


    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>

                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>

                    </Col>
                </Row>
            </Container>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />

                    <select
                        className="form-control"
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        value={parentCategoryId}
                        <option>select category</option>
                        {
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>

                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Category