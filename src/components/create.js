import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { API } from 'aws-amplify';

export default function Create() {
    const [availableMedicine, setAvailableMedicine] = useState('');
    const [composition, setComposition] = useState('');
    const [category, setCategory] = useState('');
    const [maker, setMaker] = useState('');
    const [price, setPrice] = useState('');
    const [packageType, setPackageType] = useState('');
    const [usage, setUsage] = useState('');

    const postData = () => {
        API.post('pharmacyapi', '/pharmacy', {
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
                    <label>Available medicine</label>
                    <input placeholder='Available medicine' onChange={(e) => setAvailableMedicine(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Composition</label>
                    <input placeholder='Composition' onChange={(e) => setComposition(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Category</label>
                    <input placeholder='Category' onChange={(e) => setCategory(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Maker</label>
                    <input placeholder='Maker' onChange={(e) => setMaker(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='Price' onChange={(e) => setPrice(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Package type</label>
                    <input placeholder='Package type' onChange={(e) => setPackageType(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Usage</label>
                    <input placeholder='Usage' onChange={(e) => setUsage(e.target.value)} />
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}
