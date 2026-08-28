import {
	BanknoteIcon,
	BuildingIcon,
	ChartNoAxesCombinedIcon,
	FileTextIcon,
	LayoutDashboardIcon,
	ListChecksIcon,
	ReceiptTextIcon,
	SettingsIcon,
	UsersIcon,
} from 'lucide-react';

import type { AppShellChrome, AppShellUser, SidebarNavGroup } from './app-shell.types';

/** Mock nav, close in shape to a real back office. Replace wholesale. */
export const MOCK_NAV: readonly SidebarNavGroup[] = [
	{
		key: 'home',
		items: [{ key: 'dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboardIcon }],
	},
	{
		key: 'operations',
		label: 'Operations',
		items: [
			{
				key: 'orders',
				label: 'Orders',
				href: '/orders',
				icon: ReceiptTextIcon,
				activePrefix: '/orders',
			},
			{ key: 'invoices', label: 'Invoices', href: '/invoices', icon: FileTextIcon },
			{ key: 'payouts', label: 'Payouts', href: '/payouts', icon: BanknoteIcon },
			{ key: 'tasks', label: 'Checklist', href: '/tasks', icon: ListChecksIcon },
		],
	},
	{
		key: 'directory',
		label: 'Directory',
		items: [
			{ key: 'customers', label: 'Customers', href: '/customers', icon: UsersIcon },
			{ key: 'suppliers', label: 'Suppliers', href: '/suppliers', icon: BuildingIcon },
		],
	},
	{
		key: 'insight',
		label: 'Insight',
		items: [
			{ key: 'reports', label: 'Reports', href: '/reports', icon: ChartNoAxesCombinedIcon },
			{ key: 'settings', label: 'Settings', href: '/settings', icon: SettingsIcon },
		],
	},
];

export const MOCK_CHROME: AppShellChrome = {
	brand: 'Meridian',
	brandHref: '/',
	logo: null,
};

export const MOCK_USER: AppShellUser = {
	name: 'Yasmine Belkacem',
	email: 'yasmine@meridian.works',
	initials: 'YB',
};

/*
	Table mocks below. Three row sets cover the three shapes a back office actually
	has: a money ledger, a party directory and a work queue. Every route in
	MOCK_PAGES points at one of them, which is what makes clicking the nav feel like
	changing pages without shipping nine screens of invented data.
*/

export type MockStatus = 'settled' | 'pending' | 'overdue' | 'draft' | 'active' | 'hold';

export type MockRow = {
	/** Business or item name. Carries the row. */
	name: string;
	/** Rest of the first cell: city, contact, owner. Buys density for one string. */
	meta: string;
	status: MockStatus;
	/** Day and month. The year is implied by the period filter. */
	date: string;
	/** Whole rials, or a plain count on the work queue. Formatted by the demo. */
	amount: number;
};

/** Tuple form so a row fits on one line and the columns stay readable down the file. */
type RowTuple = readonly [string, string, MockStatus, string, number];

const rows = (tuples: readonly RowTuple[]): readonly MockRow[] =>
	tuples.map(([name, meta, status, date, amount]) => ({ name, meta, status, date, amount }));

/** Invoiced work. Feeds the money routes. */
export const MOCK_LEDGER = rows([
	['Al Nahda Trading', 'Muscat', 'overdue', '02 Aug', 4315],
	['Cedar & Co', 'Beirut', 'settled', '05 Aug', 860],
	['Petra Logistics', 'Amman', 'pending', '06 Aug', 1240],
	['Sohar Metalworks', 'Sohar', 'settled', '06 Aug', 2980],
	['Maghreb Foods SARL', 'Casablanca', 'pending', '07 Aug', 615],
	['Nizwa Dates Co', 'Nizwa', 'settled', '08 Aug', 1470],
	['Dhofar Cold Chain', 'Salalah', 'overdue', '08 Aug', 7120],
	['Qasr Marble', 'Doha', 'draft', '09 Aug', 380],
	['Tanger Textiles', 'Tangier', 'settled', '10 Aug', 2240],
	['Bahja Interiors', 'Muscat', 'pending', '11 Aug', 940],
	['Rustaq Hardware', 'Rustaq', 'settled', '12 Aug', 1105],
	['Sidi Bou Provisions', 'Tunis', 'pending', '12 Aug', 725],
	['Khasab Fisheries', 'Khasab', 'settled', '13 Aug', 3460],
	['Atlas Ceramics', 'Fes', 'draft', '14 Aug', 1890],
	['Barka Agri Supply', 'Barka', 'settled', '14 Aug', 540],
	['Sur Marine Services', 'Sur', 'overdue', '15 Aug', 2065],
]);

/** Accounts, their named contact and what is still open on them. */
export const MOCK_PARTIES = rows([
	['Al Nahda Trading', 'Faisal Al Harthy', 'active', '15 Aug', 4315],
	['Sohar Metalworks', 'Aisha Al Zadjali', 'active', '12 Aug', 0],
	['Petra Logistics', 'Rana Haddad', 'hold', '28 Jul', 1240],
	['Cedar & Co', 'Georges Khoury', 'active', '14 Aug', 860],
	['Maghreb Foods SARL', 'Karim Ould Ali', 'active', '07 Aug', 615],
	['Dhofar Cold Chain', 'Salma Al Balushi', 'hold', '08 Aug', 7120],
	['Nizwa Dates Co', 'Hamed Al Amri', 'active', '08 Aug', 0],
	['Tanger Textiles', 'Hicham Rahmouni', 'active', '10 Aug', 2240],
	['Qasr Marble', 'Noura Al Kuwari', 'pending', '09 Aug', 380],
	['Bahja Interiors', 'Muna Al Saadi', 'active', '11 Aug', 940],
	['Rustaq Hardware', 'Talib Al Hinai', 'active', '12 Aug', 1105],
	['Sidi Bou Provisions', 'Amel Ben Salah', 'pending', '12 Aug', 725],
	['Khasab Fisheries', 'Yousuf Al Shehhi', 'active', '13 Aug', 3460],
	['Atlas Ceramics', 'Nour Mansouri', 'hold', '14 Aug', 1890],
	['Barka Agri Supply', 'Zayd Al Wahaibi', 'active', '14 Aug', 540],
	['Sur Marine Services', 'Latifa Al Rawahi', 'active', '15 Aug', 2065],
]);

/** Back office work items. `amount` is a row count here, not money. */
export const MOCK_QUEUE = rows([
	['VAT return, Q2', 'Yasmine Belkacem', 'pending', '20 Aug', 214],
	['Supplier credit review', 'Faisal Al Harthy', 'active', '18 Aug', 12],
	['Customs file, Sohar batch', 'Aisha Al Zadjali', 'hold', '17 Aug', 40],
	['Payout run reconciliation', 'Rana Haddad', 'active', '17 Aug', 86],
	['Cold chain temperature log', 'Salma Al Balushi', 'overdue', '14 Aug', 31],
	['Price list refresh', 'Karim Ould Ali', 'pending', '21 Aug', 158],
	['Duplicate account sweep', 'Talib Al Hinai', 'settled', '13 Aug', 9],
	['Freight invoice dispute', 'Georges Khoury', 'active', '19 Aug', 4],
	['Warehouse stock count', 'Hamed Al Amri', 'pending', '22 Aug', 640],
	['Bank mandate renewal', 'Nour Mansouri', 'overdue', '11 Aug', 2],
	['Courier rate card import', 'Hicham Rahmouni', 'settled', '12 Aug', 74],
	['Dormant customer outreach', 'Muna Al Saadi', 'active', '25 Aug', 47],
	['Insurance certificate chase', 'Yousuf Al Shehhi', 'pending', '26 Aug', 6],
	['Credit note backlog', 'Amel Ben Salah', 'active', '18 Aug', 23],
	['Ledger close, July', 'Zayd Al Wahaibi', 'settled', '05 Aug', 512],
	['Port fee variance check', 'Latifa Al Rawahi', 'hold', '19 Aug', 18],
]);

/** Feed for the summary column. Route independent, the way a real one would be. */
export const MOCK_ACTIVITY: readonly { who: string; what: string; when: string }[] = [
	{ who: 'Faisal Al Harthy', what: 'marked INV-2288 settled', when: '18m' },
	{ who: 'Yasmine Belkacem', what: 'raised SO-1042 for Al Nahda Trading', when: '1h' },
	{ who: 'Rana Haddad', what: 'put Petra Logistics on hold', when: '3h' },
	{ who: 'Aisha Al Zadjali', what: 'approved payout run 40', when: 'yesterday' },
	{ who: 'Karim Ould Ali', what: 'edited the Casablanca price list', when: 'yesterday' },
	{ who: 'Talib Al Hinai', what: 'merged two Rustaq Hardware accounts', when: '2d' },
	{ who: 'Salma Al Balushi', what: 'attached a customs file to SO-1037', when: '2d' },
	{ who: 'Georges Khoury', what: 'disputed freight on INV-2274', when: '3d' },
	{ who: 'Nour Mansouri', what: 'renewed the bank mandate', when: '4d' },
];

export type MockPage = {
	title: string;
	/** One line under the title, saying what the list is scoped to. */
	hint: string;
	/** Label on the primary button. */
	action: string;
	/** Reference prefix and newest number, counted down one per row. */
	prefix: string;
	firstRef: number;
	columns: readonly [string, string, string, string, string];
	stats: readonly { label: string; value: string; note: string }[];
	rows: readonly MockRow[];
	/** Right hand summary. Values carry their own unit so pages can differ. */
	totals: readonly { label: string; value: string }[];
};

/** Route to page content. The demo falls back to `/orders` for anything unlisted. */
export const MOCK_PAGES: Record<string, MockPage> = {
	'/': {
		title: 'Dashboard',
		hint: 'Open across both branches, this month',
		action: 'New order',
		prefix: 'SO',
		firstRef: 1042,
		columns: ['Order', 'Customer', 'Status', 'Raised', 'Total (OMR)'],
		stats: [
			{ label: 'Open orders', value: '38', note: '6 more than last week' },
			{ label: 'Awaiting payment', value: '14,720', note: 'OMR, 9 invoices' },
			{ label: 'Overdue', value: '3', note: 'oldest 41 days' },
			{ label: 'Shipped this week', value: '24', note: '2 part shipments' },
		],
		rows: MOCK_LEDGER,
		totals: [
			{ label: 'Invoiced this month', value: 'OMR 32,145' },
			{ label: 'Collected', value: 'OMR 17,425' },
			{ label: 'Credit notes', value: 'OMR 640' },
		],
	},
	'/orders': {
		title: 'Orders',
		hint: '38 open, 4 held for a credit check',
		action: 'New order',
		prefix: 'SO',
		firstRef: 1042,
		columns: ['Order', 'Customer', 'Status', 'Raised', 'Total (OMR)'],
		stats: [
			{ label: 'Open', value: '38', note: '6 more than last week' },
			{ label: 'Held', value: '4', note: 'credit check' },
			{ label: 'Ready to ship', value: '11', note: 'picked today' },
			{ label: 'Value open', value: '46,830', note: 'OMR, excl. tax' },
		],
		rows: MOCK_LEDGER,
		totals: [
			{ label: 'Open value', value: 'OMR 46,830' },
			{ label: 'Average order', value: 'OMR 1,232' },
			{ label: 'Held value', value: 'OMR 9,410' },
		],
	},
	'/invoices': {
		title: 'Invoices',
		hint: 'Issued in the last 30 days, all branches',
		action: 'Draft invoice',
		prefix: 'INV',
		firstRef: 2291,
		columns: ['Invoice', 'Customer', 'Status', 'Issued', 'Total (OMR)'],
		stats: [
			{ label: 'Outstanding', value: '14,720', note: 'OMR, 9 invoices' },
			{ label: 'Overdue', value: '6,380', note: 'OMR, 3 invoices' },
			{ label: 'Drafts', value: '2', note: 'awaiting approval' },
			{ label: 'Paid in 30 days', value: '17,425', note: 'OMR, 21 invoices' },
		],
		rows: MOCK_LEDGER,
		totals: [
			{ label: 'Due this week', value: 'OMR 4,180' },
			{ label: 'Due next week', value: 'OMR 8,240' },
			{ label: 'Written off, YTD', value: 'OMR 1,215' },
		],
	},
	'/payouts': {
		title: 'Payouts',
		hint: 'Run 40, scheduled for 18 Aug',
		action: 'Start a run',
		prefix: 'PO',
		firstRef: 604,
		columns: ['Payout', 'Supplier', 'Status', 'Scheduled', 'Amount (OMR)'],
		stats: [
			{ label: 'In this run', value: '16', note: 'suppliers' },
			{ label: 'Run total', value: '31,465', note: 'OMR, net of credits' },
			{ label: 'Blocked', value: '2', note: 'missing bank details' },
			{ label: 'Last run', value: '28,900', note: 'OMR, cleared 4 Aug' },
		],
		rows: MOCK_LEDGER,
		totals: [
			{ label: 'Run total', value: 'OMR 31,465' },
			{ label: 'Bank charges', value: 'OMR 48' },
			{ label: 'Held back', value: 'OMR 2,065' },
		],
	},
	'/tasks': {
		title: 'Checklist',
		hint: 'Assigned to the Muscat team this week',
		action: 'Add item',
		prefix: 'TSK',
		firstRef: 318,
		columns: ['Item', 'Owner', 'Status', 'Due', 'Rows'],
		stats: [
			{ label: 'Open', value: '11', note: '3 due today' },
			{ label: 'Overdue', value: '2', note: 'both with finance' },
			{ label: 'Closed this week', value: '9', note: 'by 4 people' },
			{ label: 'Blocked', value: '2', note: 'waiting on customs' },
		],
		rows: MOCK_QUEUE,
		totals: [
			{ label: 'Due today', value: '3 items' },
			{ label: 'Due this week', value: '8 items' },
			{ label: 'Unassigned', value: '1 item' },
		],
	},
	'/customers': {
		title: 'Customers',
		hint: '212 accounts, 9 on credit hold',
		action: 'Add customer',
		prefix: 'CUS',
		firstRef: 4180,
		columns: ['Account', 'Contact', 'Status', 'Last order', 'Balance (OMR)'],
		stats: [
			{ label: 'Accounts', value: '212', note: '7 added this month' },
			{ label: 'On hold', value: '9', note: 'credit or documents' },
			{ label: 'Receivable', value: '24,190', note: 'OMR, net of credits' },
			{ label: 'Dormant', value: '31', note: 'no order in 90 days' },
		],
		rows: MOCK_PARTIES,
		totals: [
			{ label: 'Receivable', value: 'OMR 24,190' },
			{ label: 'Over 30 days', value: 'OMR 6,380' },
			{ label: 'Credit limit used', value: '61%' },
		],
	},
	'/suppliers': {
		title: 'Suppliers',
		hint: '64 active, 3 part way through onboarding',
		action: 'Add supplier',
		prefix: 'SUP',
		firstRef: 1160,
		columns: ['Supplier', 'Contact', 'Status', 'Last invoice', 'Payable (OMR)'],
		stats: [
			{ label: 'Active', value: '64', note: '3 onboarding' },
			{ label: 'Payable', value: '31,465', note: 'OMR, due in 14 days' },
			{ label: 'Missing documents', value: '5', note: 'trade licence' },
			{ label: 'Disputes', value: '2', note: 'freight charges' },
		],
		rows: MOCK_PARTIES,
		totals: [
			{ label: 'Payable', value: 'OMR 31,465' },
			{ label: 'Due in 7 days', value: 'OMR 12,040' },
			{ label: 'On hold', value: 'OMR 9,010' },
		],
	},
	'/reports': {
		title: 'Reports',
		hint: 'Saved reports and when they last ran',
		action: 'New report',
		prefix: 'RPT',
		firstRef: 96,
		columns: ['Report', 'Owner', 'Status', 'Last run', 'Rows'],
		stats: [
			{ label: 'Saved', value: '18', note: '6 scheduled' },
			{ label: 'Ran today', value: '7', note: 'all completed' },
			{ label: 'Failed', value: '1', note: 'timed out, retried' },
			{ label: 'Shared', value: '12', note: 'with the finance group' },
		],
		rows: MOCK_QUEUE,
		totals: [
			{ label: 'Scheduled daily', value: '4 reports' },
			{ label: 'Scheduled weekly', value: '2 reports' },
			{ label: 'Longest run', value: '38s' },
		],
	},
	'/settings': {
		title: 'Settings',
		hint: 'Workspace audit log, last 30 days',
		action: 'Invite a colleague',
		prefix: 'LOG',
		firstRef: 8814,
		columns: ['Change', 'By', 'Status', 'When', 'Rows'],
		stats: [
			{ label: 'Members', value: '14', note: '3 admins' },
			{ label: 'Changes, 30 days', value: '86', note: 'by 9 people' },
			{ label: 'Pending invites', value: '2', note: 'sent this week' },
			{ label: 'API keys', value: '3', note: '1 expires in 12 days' },
		],
		rows: MOCK_QUEUE,
		totals: [
			{ label: 'Branches', value: 'Muscat, Sohar' },
			{ label: 'Currency', value: 'OMR' },
			{ label: 'Tax scheme', value: 'VAT 5%' },
		],
	},
};
