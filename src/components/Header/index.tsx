import { SignInButton } from '../SignInButton';
import Link from 'next/link';

import styles from './styles.module.scss';

export function Header() {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Logo ig.news" />
                <nav>
                    <Link href="/">
                        <a className={styles.active}>Home</a>
                    </Link>
                    <Link href="/Posts">
                        <a>Posts</a>
                    </Link>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
}
