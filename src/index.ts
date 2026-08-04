/**
 * @pinchblock/ui public barrel. Every component MUST be exported here;
 * this package is consumed as raw source and unexported code does not
 * exist for consumers. Keep groups alphabetical within their section.
 */

/* Lib */
export { cn } from "./lib/cn.ts"
export {
  applyMode,
  applyTheme,
  MODE_STORAGE_KEY,
  setDensity,
  setFontScale,
  setRadius,
  THEME_STORAGE_KEY,
  type ModeSetting,
} from "./lib/theme.ts"
export { themeBootScript } from "./lib/theme-boot.ts"
export {
  durations,
  easings,
  fadeIn,
  fadeInUp,
  pageTransition,
  Reveal,
  scaleIn,
  springPop,
  staggerChildren,
  transitions,
  type RevealProps,
} from "./lib/motion.ts"

/* Hooks */
export { useFileDrop, type UseFileDropOptions, type UseFileDropResult } from "./hooks/use-file-drop.ts"

/* Tokens (also available as @pinchblock/ui/tokens for React Native) */
export { defaultTheme, ember, glacier, nocturne, ocean, shared, themes } from "./tokens/index.ts"
export type { Mode, ModeTokens, SharedTokens, ThemeDefinition } from "./tokens/index.ts"

/* Primitives */
export { Avatar, avatarVariants, type AvatarProps, type AvatarRing } from "./components/ui/avatar.tsx"
export { AvatarGroup, type AvatarGroupProps } from "./components/ui/avatar-group.tsx"
export { Badge, badgeVariants, type BadgeProps } from "./components/ui/badge.tsx"
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button.tsx"
export { CounterBadge, counterBadgeVariants, NotificationDot, notificationDotVariants, type CounterBadgeProps, type NotificationDotProps } from "./components/ui/counter-badge.tsx"
export { IconButton, iconButtonVariants, type IconButtonProps } from "./components/ui/icon-button.tsx"
export { Kbd } from "./components/ui/kbd.tsx"
export { Progress, progressVariants, type ProgressProps } from "./components/ui/progress.tsx"
export { Separator } from "./components/ui/separator.tsx"
export { Skeleton, SkeletonText, type SkeletonTextProps } from "./components/ui/skeleton.tsx"
export { Spinner, spinnerVariants, type SpinnerProps } from "./components/ui/spinner.tsx"
export { TagPill, tagPillVariants, type TagPillProps } from "./components/ui/tag-pill.tsx"
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, type TooltipContentProps } from "./components/ui/tooltip.tsx"

/* Forms */
export { Calendar, type CalendarProps } from "./components/ui/calendar.tsx"
export { Checkbox, checkboxVariants, type CheckboxProps } from "./components/ui/checkbox.tsx"
export { AsyncCombobox, type AsyncComboboxProps } from "./components/async-combobox.tsx"
export { Combobox, ComboboxCollection, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxStatus, comboboxInputVariants, type ComboboxEmptyProps, type ComboboxGroupLabelProps, type ComboboxInputProps, type ComboboxItemProps, type ComboboxListProps, type ComboboxPopupProps, type ComboboxStatusProps } from "./components/ui/combobox.tsx"
export { DatePicker, DateRangePicker, datePickerTriggerVariants, type DatePickerProps, type DateRange, type DateRangePickerProps, type Matcher } from "./components/ui/date-picker.tsx"
export { Field, type FieldProps } from "./components/ui/field.tsx"
export { ChipGroup, FilterChip, filterChipVariants, type ChipGroupProps, type FilterChipProps } from "./components/ui/filter-chip.tsx"
export { Input, inputVariants, type InputProps } from "./components/ui/input.tsx"
export { Label, labelVariants, type LabelProps } from "./components/ui/label.tsx"
export { MonthPicker, type MonthPickerProps } from "./components/ui/month-picker.tsx"
export { NumberField, numberFieldButtonVariants, numberFieldGroupVariants, type NumberFieldProps } from "./components/ui/number-field.tsx"
export { RadioCard, radioCardVariants, type RadioCardProps } from "./components/ui/radio-card.tsx"
export { Radio, RadioGroup, radioVariants, type RadioGroupProps, type RadioProps } from "./components/ui/radio-group.tsx"
export { SearchInput, type SearchInputProps } from "./components/ui/search-input.tsx"
export { SegmentedControl, SegmentedControlItem, segmentedControlItemVariants, segmentedControlVariants, type SegmentedControlItemProps, type SegmentedControlProps } from "./components/ui/segmented-control.tsx"
export { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectTrigger, SelectValue, SimpleSelect, selectTriggerVariants, type SelectGroupLabelProps, type SelectItemProps, type SelectPopupProps, type SelectTriggerProps, type SimpleSelectOption, type SimpleSelectProps } from "./components/ui/select.tsx"
export { Slider, sliderThumbVariants, type SliderProps } from "./components/ui/slider.tsx"
export { Switch, switchThumbVariants, switchVariants, type SwitchProps } from "./components/ui/switch.tsx"
export { Textarea, textareaVariants, type TextareaProps } from "./components/ui/textarea.tsx"

/* Overlays */
export { ConfirmDialog, useConfirm, type ConfirmDialogProps, type ConfirmOptions } from "./components/ui/confirm-dialog.tsx"
export {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
  dialogBackdropClassName,
  dialogPopupVariants,
  dialogViewportClassName,
  type DialogDescriptionProps,
  type DialogPopupProps,
  type DialogTitleProps,
} from "./components/ui/dialog.tsx"
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuPopup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  dropdownMenuItemVariants,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuGroupLabelProps,
  type DropdownMenuItemProps,
  type DropdownMenuPopupProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuSeparatorProps,
} from "./components/ui/dropdown-menu.tsx"
export {
  HoverCard,
  HoverCardPopup,
  HoverCardTrigger,
  type HoverCardPopupProps,
  type HoverCardProps,
} from "./components/ui/hover-card.tsx"
export {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
  type PopoverDescriptionProps,
  type PopoverPopupProps,
  type PopoverTitleProps,
} from "./components/ui/popover.tsx"
export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
  sheetPopupVariants,
  type SheetBodyProps,
  type SheetDescriptionProps,
  type SheetPopupProps,
  type SheetProps,
  type SheetSide,
  type SheetTitleProps,
} from "./components/ui/sheet.tsx"
export {
  Toaster,
  toast,
  toastIconVariants,
  toastManager,
  type ToastOptions,
  type ToastTone,
  type ToasterProps,
} from "./components/ui/toast.tsx"

/* Content */
export { Accordion, AccordionItem, AccordionPanel, AccordionTrigger, type AccordionItemProps, type AccordionPanelProps, type AccordionProps, type AccordionTriggerProps } from "./components/ui/accordion.tsx"
export { DataTable, type ColumnDef, type DataTableColumnMeta, type DataTableProps } from "./components/data-table.tsx"
export { columnMetaOf, DataTableHeaderCell, DataTableSkeletonRows, dataTableSelectionColumn } from "./components/data-table-parts.tsx"
export { DragHandle, dragHandleVariants, ReorderButtons, SortableItem, sortableItemVariants, SortableList, type DragHandleProps, type ReorderButtonsProps, type SortableItemProps, type SortableListProps } from "./components/sortable-list.tsx"
export { Alert, alertVariants, type AlertProps } from "./components/ui/alert.tsx"
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardVariants, type CardProps } from "./components/ui/card.tsx"
export { Pagination, paginationVariants, type PaginationProps } from "./components/ui/pagination.tsx"
export { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow, type TableCellProps, type TableHeadProps } from "./components/ui/table.tsx"
export { Tabs, TabsList, TabsPanel, TabsTab, tabsListVariants, tabsTabVariants, type TabsListProps, type TabsPanelProps, type TabsProps, type TabsTabProps } from "./components/ui/tabs.tsx"
export { EmptyState, emptyStateVariants, type EmptyStateProps } from "./components/empty-state.tsx"
export { ListRow, type InteractiveListRowProps, type ListRowProps } from "./components/list-row.tsx"
export { PageHeader, pageHeaderTitleVariants, type PageHeaderBackLink, type PageHeaderProps } from "./components/page-header.tsx"
export { SectionHeader, type SectionHeaderProps } from "./components/section-header.tsx"
export { StatTile, type StatTileProps, type StatTileTrend } from "./components/stat-tile.tsx"
export { Stepper, stepperVariants, type StepperProps } from "./components/stepper.tsx"
export { ToggleRow, type ToggleRowProps } from "./components/toggle-row.tsx"

/* Charts and data viz */
export {
  ChartContainer,
  chartContainerVariants,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
  type ChartConfig,
  type ChartContainerProps,
  type ChartLegendContentProps,
  type ChartSeriesConfig,
  type ChartTooltipContentProps,
} from "./components/charts/chart.tsx"
export { ActivityRing, activityRingVariants, type ActivityRingData, type ActivityRingProps } from "./components/charts/activity-ring.tsx"
export { AnimatedNumber, AnimatedNumberGroup, type AnimatedNumberProps } from "./components/charts/animated-number.tsx"
export { Sparkline, smoothPath, type SparklineProps } from "./components/charts/sparkline.tsx"
export { StreakHeatmap, type StreakDay, type StreakHeatmapProps } from "./components/charts/streak-heatmap.tsx"
export { TrendChart, trendChartVariants, type TrendChartProps, type TrendPoint } from "./components/charts/trend-chart.tsx"
export {
  FEEL_LABELS,
  FEEL_VALUES,
  FeelBadge,
  feelBadgeVariants,
  FeelDot,
  feelDotVariants,
  FeelPicker,
  feelPickerItemVariants,
  type FeelBadgeProps,
  type FeelDotProps,
  type FeelPickerProps,
  type FeelValue,
} from "./components/rating-feel.tsx"

/* Media and chat */
export { ChatBubble, chatBubbleVariants, DateDivider, type ChatBubbleProps, type DateDividerProps } from "./components/chat-bubble.tsx"
export { ChatComposer, type ChatComposerProps } from "./components/chat-composer.tsx"
export { MediaFrame, mediaFrameVariants, type MediaFrameProps, type MediaFrameRatio, type MediaFrameState } from "./components/media-frame.tsx"
export { TypingIndicator, type TypingIndicatorProps } from "./components/typing-indicator.tsx"
export { UploadDropzone, UploadFileChip, uploadDropzoneVariants, type UploadDropzoneProps, type UploadFileChipProps } from "./components/upload-dropzone.tsx"
export { VideoPlayer, videoPlayerVariants, type VideoPlayerProps } from "./components/video-player.tsx"

/* Layout and navigation */
export { AppShell, type AppShellLayout, type AppShellProps } from "./components/app-shell.tsx"
export {
  MobileTabBar,
  mobileTabBarFabVariants,
  mobileTabBarItemVariants,
  type MobileTabBarFab,
  type MobileTabBarProps,
} from "./components/mobile-tab-bar.tsx"
export {
  NavRail,
  NavRailItem,
  navRailItemVariants,
  navRailVariants,
  type NavItem,
  type NavRailItemProps,
  type NavRailProps,
  type NavRailSection,
} from "./components/nav-rail.tsx"
export { Page, pageVariants, type PageProps } from "./components/page.tsx"
export { PhoneFrame, type PhoneFrameProps } from "./components/phone-frame.tsx"
export { Grow, Row, rowVariants, type RowProps } from "./components/row.tsx"
export { Stack, stackVariants, type StackProps } from "./components/stack.tsx"
export { TopBar, type TopBarProps } from "./components/top-bar.tsx"
