import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory, updateCategories,deleteCategories as deleteCategoriesAction } from '../../actions/index.js'
import Layout from '../../components/layout'
import { Input } from '../../components/UI/Input/index.js'
import Modal from "../../components/UI/Modal"
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'


const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModel, setUpdateCategoryModel] = useState(false);
    const [deleteCategoryModal,setDeleteCategoryModal] = useState(false);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllCategory())
    // }, [])

    const handleClose = () => {
        const form = new FormData();
        //console.log("categoryName,parentCategoryId,categoryImage", { categoryName, parentCategoryId, categoryImage });
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
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
           // console.log("category",category);
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId })
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;


    }
    //console.log("createCategoryList",createCategoryList(category.categories))

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }


    const updateCategory = () => {
        updateCheckedAndExpandedCategories();
        setUpdateCategoryModel(true);
        //console.log({ checked, expanded })
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleCategoryInput = (key, value, index, type) => {
        //console.log(value);
        if (type === "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const renderUpdateCategoriesModal = () => {
        return (
            < Modal show={updateCategoryModel} handleClose={updateCategoriesForm} modalTitle={'Update Categories'} size='lg' >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.name}
                                        placeholder={'Category Name'}

                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                                        value={item.parentId}>
                                        <option>select category</option>
                                        {
                                            createCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select>
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    })
                }
                <Row>
                    <Col>
                        <h6>Checked</h6>
                    </Col>
                </Row>
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((item, index) => {
                        return (
                            <Row key={index}>
                                <Col>
                                    <Input
                                        value={item.name}
                                        placeholder={'Category Name'}

                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                    />
                                </Col>
                                <Col>
                                    <select
                                        className="form-control"
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                                        value={item.parentId}>
                                        <option>select category</option>
                                        {
                                            createCategoryList(category.categories).map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select>
                                        <option value="">Select Type</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    })
                }


                {/* <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={'Category Name'}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
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
                </Col>
                <Col>
                <select>
                    <option value="">Select Type</option>
                    <option value="store">Store</option>
                    <option value="product">Product</option>
                    <option value="page">Page</option>
                </select>
                </Col>
            </Row> */}





                {/* <input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}

            </Modal >
        )
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories();
        setDeleteCategoryModal(true);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }));
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        dispatch(getAllCategory())
                        setDeleteCategoryModal(false)
                    }
                });
        }

        setDeleteCategoryModal(false);


    }

    const renderDeleteCategoryModal = () => {
        return (
            <Modal 
                modalTitle="Confirm" 
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'No',
                        color: 'primary',
                        onClick: () => {
                            alert('no');
                        }
                    },
                    {
                        label: 'Yes',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
                >
                   <h5>Expanded</h5>
                   {
                    expandedArray.map((item,index) => <span key={index}>{item.name}</span>)
                   }
                   <h5>Checked</h5>
                   {
                    checkedArray.map((item,index) => <span key={index}>{item.name}</span>)
                   }
            </Modal>
        )
    }

    const renderAddCategoryModal = () => {
        return (
            <Modal show={show} handleClose={handleClose} modalTitle={'Add New Category'}>

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

        </Modal>
        )
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form))
        .then(result =>{
            if(result){
                dispatch(getAllCategory())
            }
        })
        setUpdateCategoryModel(false)
        
    }

    


    //console.log("category-----------------------",renderCategories(category.categories))
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
                        {/* <ul>
                            {renderCategories(category.categories)}
                        </ul> */}
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />

                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={deleteCategory}>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoriesModal()}
            {renderDeleteCategoryModal()}
        </Layout>
    )
}

export default Category