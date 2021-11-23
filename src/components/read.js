import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';

export default function Read() {
    const [APIData, setAPIData] = useState([]);

    const fetchData = async () => {
        try {
            const data = await API.get('pharmacyapi', '/pharmacy');
            console.log(data)
            setAPIData(data);
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);

    const setData = (data) => {
        let { id } = data;
        localStorage.setItem('ID', id);
    }

    const getData = () => {
        fetchData();
    }

    const onDelete = (id) => {
        API.del('pharmacyapi', `/pharmacy/${id}`)
        fetchData();
    }

    return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Available medicine</Table.HeaderCell>
                        <Table.HeaderCell>Composition</Table.HeaderCell>
                        <Table.HeaderCell>Category</Table.HeaderCell>
                        <Table.HeaderCell>Maker</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Type package</Table.HeaderCell>
                        <Table.HeaderCell>Usage</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {APIData.map((data, key) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{data.availableMedicine.S}</Table.Cell>
                                <Table.Cell>{data.composition.S}</Table.Cell>
                                <Table.Cell>{data.category.S}</Table.Cell>
                                <Table.Cell>{data.maker.S}</Table.Cell>
                                <Table.Cell>{data.price.N}</Table.Cell>
                                <Table.Cell>{data.typePackage.S}</Table.Cell>
                                <Table.Cell>{data.usage.S}</Table.Cell>
                                <Link to={{ pathname: '/update', data: data.id.S }}>
                                    <Table.Cell>
                                        <Button onClick={() => setData(data.id.S)}>Update</Button>
                                    </Table.Cell>
                                </Link>
                                <Table.Cell>
                                    <Button onClick={() => onDelete(data.id.S)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
    )
}