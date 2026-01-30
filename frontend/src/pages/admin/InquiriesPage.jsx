import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
	Search,
	Phone,
	Mail,
	MessageSquare,
	Calendar,
	Eye,
	CheckCircle2,
	Clock,
	XCircle,
	UserCheck,
	Send,
	Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format } from 'date-fns';
import api from '@/lib/api';

/* ================= STATUS OPTIONS ================= */
const statusOptions = [
	{ value: 'new', label: 'New', color: 'bg-warning/10 text-warning' },
	{ value: 'assigned', label: 'Assigned', color: 'bg-primary/10 text-primary' },
	{
		value: 'talked',
		label: 'Talked',
		color: 'bg-accent/10 text-accent-foreground',
	},
	{
		value: 'visit_scheduled',
		label: 'Visit Scheduled',
		color: 'bg-success/10 text-success',
	},
	{
		value: 'visit_completed',
		label: 'Visit Completed',
		color: 'bg-chart-3/10 text-chart-3',
	},
	{ value: 'closed', label: 'Closed', color: 'bg-muted text-muted-foreground' },
];

const InquiriesPage = () => {
	const [inquiries, setInquiries] = useState([]);
	const [agents, setAgents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [typeFilter, setTypeFilter] = useState('all');
	const [selectedInquiry, setSelectedInquiry] = useState(null);
	const [isDetailOpen, setIsDetailOpen] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const [newStatus, setNewStatus] = useState('');
	const [submitting, setSubmitting] = useState(false);

	/* ================= LOAD DATA ================= */
	useEffect(() => {
		fetchInquiries();
		fetchAgents();
	}, []);
	/* ================= FETCH INQUIRIES (DOST LOGIC) ================= */
	const fetchInquiries = async () => {
		try {
			const { data } = await api.get('/inquiries/');

			const normalized = data.map((i) => ({
				...i,
				status: i.stage?.toLowerCase(),
			}));

			setInquiries(normalized);
		} catch (error) {
			console.error('Error fetching inquiries:', error);
			toast.error('Failed to load inquiries');
		} finally {
			setLoading(false);
		}
	};

	/* ================= FETCH AGENTS ================= */
	const fetchAgents = async () => {
		try {
			const { data } = await api.get('/agents/', {
				params: { status: 'active' },
			});
			setAgents(data);
		} catch (error) {
			console.error('Error fetching agents:', error);
		}
	};

	/* ================= ASSIGN AGENT (DOST LOGIC) ================= */
	const assignAgent = async (inquiryId, agentId) => {
		try {
			await api.put(`/inquiries/${inquiryId}/assign`, null, {
				params: { agent_id: agentId },
			});

			toast.success('Inquiry assigned successfully');
			fetchInquiries();
		} catch (error) {
			console.error('Error assigning inquiry:', error);
			toast.error('Failed to assign inquiry');
		}
	};

	/* ================= OPEN DETAIL (FULL DATA) ================= */
	const openInquiryDetail = async (inquiry) => {
		try {
			const { data } = await api.get(`/inquiries/${inquiry.id}`);
			setSelectedInquiry({
				...data,
				status: data.stage?.toLowerCase(),
			});
			setIsDetailOpen(true);
		} catch (error) {
			console.error('Error fetching inquiry detail:', error);
		}
	};

	/* ================= ADD CONVERSATION LOG (DOST BACKEND + TUMHARA UI) ================= */
	const addConversationLog = async () => {
		if (!newMessage.trim() || !selectedInquiry) return;

		setSubmitting(true);
		try {
			await api.post(`/inquiries/${selectedInquiry.id}/notes`, null, {
				params: { note: newMessage },
			});

			toast.success('Log added');
			setNewMessage('');
			setNewStatus('');
			fetchInquiries();

			const { data } = await api.get(`/inquiries/${selectedInquiry.id}`);
			setSelectedInquiry({
				...data,
				status: data.stage?.toLowerCase(),
			});
		} catch (error) {
			console.error(error);
			toast.error('Failed to add log');
		} finally {
			setSubmitting(false);
		}
	};
	/* ================= FILTER SYSTEM ================= */
	const filteredInquiries = inquiries.filter((inquiry) => {
		const matchesSearch =
			inquiry.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			inquiry.phone?.includes(searchQuery) ||
			inquiry.email?.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			statusFilter === 'all' || inquiry.status === statusFilter;
		const matchesType =
			typeFilter === 'all' || inquiry.inquiry_type === typeFilter;

		return matchesSearch && matchesStatus && matchesType;
	});

	const getStatusColor = (status) =>
		statusOptions.find((o) => o.value === status)?.color ||
		'bg-muted text-muted-foreground';

	const getStatusIcon = (status) => {
		switch (status) {
			case 'new':
				return Clock;
			case 'assigned':
				return UserCheck;
			case 'talked':
				return MessageSquare;
			case 'visit_scheduled':
				return Calendar;
			case 'visit_completed':
				return CheckCircle2;
			case 'closed':
				return XCircle;
			default:
				return MessageSquare;
		}
	};

	const getTypeIcon = (type) => {
		switch (type) {
			case 'schedule_visit':
				return Calendar;
			case 'callback':
				return Phone;
			default:
				return MessageSquare;
		}
	};

	/* ================= UI STARTS HERE ================= */
	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-2xl md:text-3xl font-bold text-foreground">
					Inquiries
				</h1>
				<p className="text-muted-foreground">
					Manage customer inquiries and assign to agents
				</p>
			</div>
			{/* Filters */}
			<Card className="bg-card border-0 shadow-card">
				<CardContent className="p-4">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
							<Input
								placeholder="Search by name, phone, or email..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>

						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-full sm:w-40">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								{statusOptions.map((opt) => (
									<SelectItem key={opt.value} value={opt.value}>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger className="w-full sm:w-40">
								<SelectValue placeholder="Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Types</SelectItem>
								<SelectItem value="general">General</SelectItem>
								<SelectItem value="schedule_visit">Schedule Visit</SelectItem>
								<SelectItem value="callback">Callback</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Table */}
			<Card className="bg-card border-0 shadow-card overflow-hidden">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Contact</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Assigned To</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={6} className="text-center py-8">
										<Loader2 className="w-6 h-6 animate-spin mx-auto" />
									</TableCell>
								</TableRow>
							) : filteredInquiries.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="text-center py-8">
										<p className="text-muted-foreground">No inquiries found</p>
									</TableCell>
								</TableRow>
							) : (
								filteredInquiries.map((inquiry) => {
									const TypeIcon = getTypeIcon(inquiry.inquiry_type);
									const StatusIcon = getStatusIcon(inquiry.status);
									return (
										<TableRow key={inquiry.id}>
											<TableCell>
												<p className="font-medium">{inquiry.name}</p>
												<p className="text-sm text-muted-foreground flex items-center gap-1">
													<Phone className="w-3 h-3" /> {inquiry.phone}
												</p>
												{inquiry.email && (
													<p className="text-sm text-muted-foreground flex items-center gap-1">
														<Mail className="w-3 h-3" /> {inquiry.email}
													</p>
												)}
											</TableCell>

											<TableCell>
												<div className="flex items-center gap-2">
													<TypeIcon className="w-4 h-4 text-primary" />
													<span className="capitalize">
														{inquiry.inquiry_type?.replace('_', ' ')}
													</span>
												</div>
											</TableCell>

											<TableCell>
												<Select
													value={inquiry.assigned_agent_id || ''}
													onValueChange={(agentId) =>
														assignAgent(inquiry.id, agentId)
													}
												>
													<SelectTrigger className="w-40 h-8 text-xs">
														{inquiry.assigned_agent_name ? (
															<div className="flex items-center gap-1">
																<UserCheck className="w-3 h-3 text-success" />
																<span className="truncate">
																	{inquiry.assigned_agent_name}
																</span>
															</div>
														) : (
															<SelectValue placeholder="Assign Agent" />
														)}
													</SelectTrigger>

													<SelectContent>
														<SelectItem value="unassign">Unassign</SelectItem>

														{agents.map((agent) => (
															<SelectItem key={agent.id} value={agent.id}>
																{agent.name}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</TableCell>

											<TableCell>
												<p className="text-sm">
													{inquiry.created_at
														? format(
																new Date(inquiry.created_at),
																'MMM d, yyyy',
															)
														: '-'}
												</p>
												<p className="text-xs text-muted-foreground">
													{inquiry.created_at
														? format(new Date(inquiry.created_at), 'h:mm a')
														: ''}
												</p>
											</TableCell>

											<TableCell>
												<span
													className={cn(
														'inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium capitalize',
														getStatusColor(inquiry.status),
													)}
												>
													<StatusIcon className="w-3 h-3" />
													{inquiry.status?.replace('_', ' ')}
												</span>
											</TableCell>

											<TableCell className="text-right">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => openInquiryDetail(inquiry)}
												>
													<Eye className="w-4 h-4 mr-1" /> View
												</Button>
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</div>
			</Card>

			{/* Inquiry Dialog */}
			<Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
				<DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Inquiry Details</DialogTitle>
					</DialogHeader>

					{selectedInquiry && (
						<div className="space-y-6">
							{/* Contact */}
							<div className="p-4 bg-secondary/50 rounded-xl">
								<h3 className="font-semibold mb-3">{selectedInquiry.name}</h3>

								<div className="grid sm:grid-cols-2 gap-3 text-sm">
									<div className="flex items-center gap-2">
										<Phone className="w-4 h-4 text-primary" />
										{selectedInquiry.phone}
									</div>
									{selectedInquiry.email && (
										<div className="flex items-center gap-2">
											<Mail className="w-4 h-4 text-primary" />
											{selectedInquiry.email}
										</div>
									)}
								</div>

								{selectedInquiry.message && (
									<p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
										{selectedInquiry.message}
									</p>
								)}
							</div>

							{/* Status + Agent */}
							<div className="grid sm:grid-cols-2 gap-4">
								<div>
									<Label className="text-xs text-muted-foreground">
										Status
									</Label>
									<p
										className={cn(
											'inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full font-medium capitalize mt-1',
											getStatusColor(selectedInquiry.status),
										)}
									>
										{selectedInquiry.status?.replace('_', ' ')}
									</p>
								</div>

								<div>
									<Label className="text-xs text-muted-foreground">
										Assigned Agent
									</Label>
									<p className="text-sm font-medium mt-1">
										{selectedInquiry.assigned_agent_name || 'Not assigned'}
									</p>
								</div>
							</div>

							{/* Conversation Logs */}
							<div>
								<Label className="text-sm font-medium mb-3 block">
									Conversation History
								</Label>

								<div className="space-y-3 max-h-60 overflow-y-auto">
									{selectedInquiry.notes?.length > 0 ? (
										selectedInquiry.notes.map((log, i) => (
											<div key={i} className="p-3 bg-muted/50 rounded-lg">
												<p className="text-sm">{log.text}</p>
												<p className="text-xs text-muted-foreground mt-2 flex justify-between">
													<span>{log.author || 'Agent'}</span>
													<span>
														{format(new Date(log.timestamp), 'MMM d, h:mm a')}
													</span>
												</p>
											</div>
										))
									) : (
										<p className="text-sm text-muted-foreground text-center py-4">
											No conversation logs yet
										</p>
									)}
								</div>
							</div>

							{/* Add New Log */}
							<div className="space-y-3 pt-4 border-t border-border">
								<Label>Add Conversation Log</Label>

								<Textarea
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Enter notes..."
									rows={3}
								/>

								<Button
									variant="teal"
									disabled={!newMessage.trim() || submitting}
									onClick={addConversationLog}
								>
									{submitting ? (
										<Loader2 className="w-4 h-4 animate-spin mr-2" />
									) : (
										<Send className="w-4 h-4 mr-2" />
									)}
									Add Log
								</Button>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default InquiriesPage;
