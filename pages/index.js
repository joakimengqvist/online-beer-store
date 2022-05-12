import React from 'react'
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link';

export default function Index() {
    return (
        <MainLayout>
            <Link href="/beer">Beer</Link>
        </MainLayout>
    )
}
