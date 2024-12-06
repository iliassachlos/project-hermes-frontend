'use client';
import { Button, Card, CardFooter, CardHeader, Image, Popover, Tooltip } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconSelector } from '@/utilities/icon-selector';
import Link from 'next/link';

function ArticleCard({ article }) {
    const nullImageUrl =
        'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=';

    return (
        <Card isFooterBlurred className='flex h-[300px] col-span-12 sm:col-span-7'>
            <CardHeader className='absolute w-full flex justify-between items-start p-3'>
                <Tooltip content={article.category.charAt(0).toUpperCase() + article.category.slice(1)}>
                    <div className='bg-black/30 backdrop-blur-md rounded-md px-2 py-[2px]'>
                        <FontAwesomeIcon className='text-white' icon={iconSelector(article)} />
                    </div>
                </Tooltip>
            </CardHeader>
            <Image
                removeWrapper
                alt='Relaxing app background'
                className='z-0 w-full h-full object-cover'
                src={article.image ? article.image : nullImageUrl}
            />
            <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
                <div className='flex justify-center items-center'>
                    <div className='flex flex-col'>
                        <p className='text-xs text-white'>{article.source}</p>
                        <p className='text-white text-sm text-left'>{article.title}</p>
                    </div>
                    <div className='mx-2'>
                        <Link href={`/feed/${article.uuid}`}>
                            <Button radius='md' size='sm'>
                                Read Article
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default ArticleCard;
