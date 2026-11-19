import {
  Accessibility, ArrowLeft, ArrowRight, ArrowUp, Award, BadgeCheck, BedDouble, BookOpen, BookOpenText,
  Building2, Calendar, CalendarDays, Car, Check, ChevronDown, ChevronLeft, ChevronRight, CircleAlert,
  CircleCheck, CircleHelp, ClipboardList, Clock, Compass, Copy, Download, ExternalLink, Eye, FileCheck2,
  FilePen, FileSearch, FileSignature, FileText, FileUp, Files, Filter, Flag, FolderCheck, FolderOpen,
  Gavel, Globe, HandCoins, Handshake, HeartHandshake, Headset, Hourglass, House, IdCard, Info, Landmark,
  Layers, Link2, ListChecks, LoaderCircle, Mail, MapPin, Megaphone, Menu, MessageSquareText, Minus,
  Newspaper, Paperclip, Pause, Phone, PhoneCall, Play, Plus, Printer, Quote, Route, Scale, ScrollText,
  Search, SearchX, Send, Share2, ShieldCheck, ShieldOff, Sparkles, Stamp, Stethoscope, Target, Timer, Upload,
  UserRound, Users, Wallet, X,
} from 'lucide-react';

/** Registry so data files can reference icons by name (CMS-friendly). */
const ICONS = {
  Accessibility, ArrowLeft, ArrowRight, ArrowUp, Award, BadgeCheck, BedDouble, BookOpen, BookOpenText,
  Building2, Calendar, CalendarDays, Car, Check, ChevronDown, ChevronLeft, ChevronRight, CircleAlert,
  CircleCheck, CircleHelp, ClipboardList, Clock, Compass, Copy, Download, ExternalLink, Eye, FileCheck2,
  FilePen, FileSearch, FileSignature, FileText, FileUp, Files, Filter, Flag, FolderCheck, FolderOpen,
  Gavel, Globe, HandCoins, Handshake, HeartHandshake, Headset, Hourglass, House, IdCard, Info, Landmark,
  Layers, Link2, ListChecks, LoaderCircle, Mail, MapPin, Megaphone, Menu, MessageSquareText, Minus,
  Newspaper, Paperclip, Pause, Phone, PhoneCall, Play, Plus, Printer, Quote, Route, Scale, ScrollText,
  Search, SearchX, Send, Share2, ShieldCheck, ShieldOff, Sparkles, Stamp, Stethoscope, Target, Timer, Upload,
  UserRound, Users, Wallet, X,
};

export default function Icon({ name, size = 22, strokeWidth = 1.75, ...rest }) {
  const Cmp = ICONS[name] || Info;
  return <Cmp size={size} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" {...rest} />;
}
