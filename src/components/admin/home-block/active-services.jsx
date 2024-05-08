'use client'
import {
    Chip, Progress,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {useEffect, useState} from "react";
import axios from "axios";

function ActiveServices() {
    const [articleStatus, setArticleStatus] = useState(500)
    const [scrapeStatus, setScrapeStatus] = useState(500)
    const [userStatus, setUserStatus] = useState(500)
    const [apigwStatus, setApigwStatus] = useState(500)
    const [elasticStatus, setElasticStatus] = useState(500)
    const [machineLearningStatus, setMachineLearningStatus] = useState(500)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkServiceStatus();
    }, []);

    async function checkServiceStatus() {
        setIsLoading(true)
        try {
            const elasticServiceResponse = await axios.get('http://localhost:8083/api/elastic/status')
            setElasticStatus(elasticServiceResponse.status)
        } catch (error) {
            console.error("Error checking elastic service status:", error)
            setElasticStatus(500)
        }

        try {
            const apiGwServiceResponse = await axios.get('http://localhost:8083/api/apigw/status')
            setApigwStatus(apiGwServiceResponse.status)
        } catch (error) {
            console.error("Error checking api-gateway service status:", error)
            setApigwStatus(500)
        }

        try {
            const articleStatusResponse = await axios.get('http://localhost:8083/api/articles/status')
            setArticleStatus(articleStatusResponse.status)
        } catch (error) {
            console.error("Error checking article service status:", error)
            setArticleStatus(500)
        }

        try {
            const scrapeStatusResponse = await axios.get('http://localhost:8083/api/scraping/status')
            setScrapeStatus(scrapeStatusResponse.status)
        } catch (error) {
            console.error("Error checking scrape service status:", error)
            setScrapeStatus(500)
        }

        try {
            const userStatusResponse = await axios.get('http://localhost:8083/api/users/status')
            setUserStatus(userStatusResponse.status)
        } catch (error) {
            console.error("Error checking user service status:", error)
            setUserStatus(500)
        }

        try {
            const machineLearningStatusResponse = await axios.get('http://localhost:8083/api/machine-learning/status')
            setMachineLearningStatus(machineLearningStatusResponse.status)
        } catch (error) {
            console.error("Error checking scrape service status:", error)
            setScrapeStatus(500)
        }
        setIsLoading(false)
    }

    return (
        <Table aria-label="Status table" className="my-2" radius="md">
            <TableHeader>
                <TableColumn>Microservice Name</TableColumn>
                <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>Article</TableCell>
                    <TableCell>
                        {isLoading ?
                            <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md"/>
                            : (articleStatus === 200 ?
                                    <Chip color="success" variant="flat">Active</Chip>
                                    :
                                    <Chip color="danger" variant="flat">Inactive</Chip>
                            )}
                    </TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Scrape</TableCell>
                    <TableCell>
                        {isLoading ?
                            <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md"/>
                            : (scrapeStatus === 200 ?
                                    <Chip color="success" variant="flat">Active</Chip>
                                    :
                                    <Chip color="danger" variant="flat">Inactive</Chip>
                            )}
                    </TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>User</TableCell>
                    <TableCell>
                        {isLoading ?
                            <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md"/>
                            : (userStatus === 200 ?
                                    <Chip color="success" variant="flat">Active</Chip>
                                    :
                                    <Chip color="danger" variant="flat">Inactive</Chip>
                            )}
                    </TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>Api Gateway</TableCell>
                    <TableCell>
                        {isLoading ?
                            <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md"/>
                            : (apigwStatus === 200 ?
                                    <Chip color="success" variant="flat">Active</Chip>
                                    :
                                    <Chip color="danger" variant="flat">Inactive</Chip>
                            )}
                    </TableCell>
                </TableRow>
                <TableRow key="5">
                    <TableCell>Elastic</TableCell>
                    <TableCell>
                        {isLoading ?
                            <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md"/>
                            : (elasticStatus === 200 ?
                                    <Chip color="success" variant="flat">Active</Chip>
                                    :
                                    <Chip color="danger" variant="flat">Inactive</Chip>
                            )}
                    </TableCell>
                </TableRow>
                <TableRow key="6">
                    <TableCell>Machine-Learning</TableCell>
                    <TableCell>
                        {isLoading ?
                            <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md"/>
                            : (machineLearningStatus === 200 ?
                                    <Chip color="success" variant="flat">Active</Chip>
                                    :
                                    <Chip color="danger" variant="flat">Inactive</Chip>
                            )}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default ActiveServices;