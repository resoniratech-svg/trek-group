import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal | Trek Group',
  robots: {
    index: false,
    follow: false,
  }
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
