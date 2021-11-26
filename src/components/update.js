import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { API } from "aws-amplify";
import { useLocation } from 'react-router-dom'

export default function Update() {
    const location = useLocation()
    const [id, setID] = useState(null);
    const [availableMedicine, setAvailableMedicine] = useState('');
    const [composition, setComposition] = useState('');
    const [category, setCategory] = useState('');
    const [maker, setMaker] = useState('');
    const [price, setPrice] = useState('');
    const [packageType, setPackageType] = useState('');
    const [usage, setUsage] = useState('');


    useEffect(() => {
        setID(location.data);
    }, [location.data]);

    const updateAPIData = () => {
        API.put('pharmacyapi', `/medicine/${id}`, {
            body: {
                availableMedicine: availableMedicine,
                composition: composition,
                category: category,
                maker: maker,
                price: price,
                packageType: packageType,
                usage: usage
            }
        })
    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>ID</label>
                    <input placeholder='ID' value={id} onChange={(e) => setID(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>AvailableMedicine</label>
                    <input placeholder='Available medicine' value={availableMedicine} onChange={(e) => setAvailableMedicine(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Composition</label>
                    <input placeholder='Composition' value={composition} onChange={(e) => setComposition(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Category</label>
                    <input placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Maker</label>
                    <input placeholder='Maker' value={maker} onChange={(e) => setMaker(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>TypePackage</label>
                    <input placeholder='Package type' value={packageType} onChange={(e) => setPackageType(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Usage</label>
                    <input placeholder='Usage' value={usage} onChange={(e) => setUsage(e.target.value)} />
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}
