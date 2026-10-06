import { useState } from "react"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { Bell, Moon, MoreHorizontal, Plus, Sun } from "lucide-react"

import { Logo, OrbitMark } from "@/components/brand/logo"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const NEUTRALS = [
  ["Ink", "bg-ink", "#0B0B0E", "Dark background, brand surface"],
  ["Grey", "bg-[#F7F7F8]", "#F7F7F8", "Light background"],
] as const

// v6 hues are accents with a narrow job, so they are shown small on purpose.
const ACCENTS = [
  ["Violet", "bg-ml-violet", "#7B2CFF"],
  ["Magenta", "bg-ml-magenta", "#E0306E"],
  ["Orange", "bg-ml-orange", "#FF7A3D"],
] as const

const SWATCHES = [
  ["background", "bg-background"], ["card", "bg-card"], ["muted", "bg-muted"], ["secondary", "bg-secondary"],
  ["primary", "bg-primary"], ["accent", "bg-accent"], ["destructive", "bg-destructive"], ["success", "bg-success"],
] as const

const BUTTONS = [
  ["default", "Primary"], ["orbit", "Orbit"], ["secondary", "Secondary"], ["outline", "Outline"],
  ["ghost", "Ghost"], ["destructive", "Delete"], ["link", "Link"],
] as const

const COVERS = [
  ["Document cover", "A4 · 210×297 mm", "aspect-[210/297]"],
  ["Social, thumbnail", "1:1 · 1080×1080", "aspect-square"],
] as const

const DOWNLOADS = [
  ["Logo, white", "/brand/logo-white.svg"],
  ["Logo, colour", "/brand/logo-color.svg"],
  ["Symbol, colour", "/brand/symbol-color.svg"],
  ["Cover, 1200 px", "/brand/cover-primary-1200.png"],
] as const

// Facts from the v6 kit (FInal Logo v6/build.mjs, font/OFL.txt).
const WEIGHTS = [
  ["Light", 300], ["Regular", 400], ["Medium", 500], ["SemiBold", 600], ["Bold", 700], ["ExtraBold", 800],
] as const

// [name, size px, line-height, tracking, weight, sample]
const TYPE_SCALE = [
  ["Display", 64, 1.05, "-3%", 500, "miracle labs"],
  ["H1", 48, 1.1, "-3%", 500, "Build what feels like magic"],
  ["H2", 36, 1.15, "-2%", 500, "Section heading"],
  ["H3", 22, 1.3, "-2%", 600, "Card or slide subtitle"],
  ["Body", 16, 1.5, "-0.5%", 400, "Body copy for paragraphs, documents and slide notes."],
  ["Small", 14, 1.5, "0", 400, "Captions, metadata and supporting detail."],
  ["Label", 12, 1, "+12%", 600, "SECTION LABEL"],
] as const

const MEDIA = [
  ["Web", "Already bundled here through @fontsource-variable/inter-tight. Elsewhere: Google Fonts, family \"Inter Tight\", weights 400 to 700."],
  ["Slides & documents", "Install Inter Tight from Google Fonts on every machine that edits the file, and turn on font embedding when saving. Fallback: Arial."],
  ["Video & motion", "Use the static TTFs in FInal Logo v6/font/static (Thin to Black), so render machines get exact weights."],
  ["Logo", "Never typeset the wordmark. Use the SVG files: the wordmark is outlined, so no font install is needed."],
] as const

function Cover({ format, size, aspect }: { format: string; size: string; aspect: string }) {
  return (
    <figure className="min-w-0 space-y-2">
      {/* Sizes use cqmin so the board keeps its proportions in every aspect ratio. */}
      <div className={`relative overflow-hidden rounded-xl bg-orbit-cover bg-grain [--grain-opacity:0.12] [container-type:size] ${aspect}`}>
        <span className="absolute top-[5.3cqmin] left-[6cqmin] text-[max(10px,1.85cqmin)] font-semibold uppercase tracking-[0.14em] text-white/65">
          Primary
        </span>
        <div className="absolute inset-0 grid place-items-center">
          <Logo tone="current" className="text-[7.6cqmin] text-white" />
        </div>
      </div>
      <figcaption className="flex flex-col gap-0.5 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:gap-2">
        <span>{format}</span>
        <span className="font-mono">{size}</span>
      </figcaption>
    </figure>
  )
}

// Placeholder members: roles instead of invented people.
const MEMBERS = ["Owner", "Editor", "Viewer"]

function copy(snippet: string) {
  navigator.clipboard.writeText(snippet).then(
    () => toast.success("Copied", { description: snippet }),
    () => toast.error("Clipboard is blocked in this browser", { description: snippet }),
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const dark = resolvedTheme === "dark"
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(dark ? "light" : "dark")}>
          {dark ? <Sun /> : <Moon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{dark ? "Light mode" : "Dark mode"}</TooltipContent>
    </Tooltip>
  )
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

function ProjectForm() {
  const [emailError, setEmailError] = useState(false)
  return (
    <Card>
      <form
        className="contents"
        noValidate
        onReset={() => setEmailError(false)}
        onSubmit={e => {
          e.preventDefault()
          const email = new FormData(e.currentTarget).get("email")?.toString() ?? ""
          const invalid = !/^\S+@\S+\.\S+$/.test(email)
          setEmailError(invalid)
          if (!invalid) {
            toast.success("Request sent", { description: `We'll reply to ${email}.` })
            e.currentTarget.reset()
          }
        }}
      >
        <CardHeader>
          <CardTitle>Start a project</CardTitle>
          <CardDescription>Form example with validation.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project name</Label>
            <Input id="name" name="name" placeholder="Project name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email" name="email" type="email" placeholder="email@example.com"
              aria-invalid={emailError} aria-describedby={emailError ? "email-error" : undefined}
            />
            {emailError && <p id="email-error" className="text-xs text-destructive">Enter a valid email address.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Select name="budget" defaultValue="mid">
              <SelectTrigger id="budget" className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Under $10k</SelectItem>
                <SelectItem value="mid">$10k to $50k</SelectItem>
                <SelectItem value="high">$50k+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Drop your message here..." />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="nda" name="nda" defaultChecked />
            <Label htmlFor="nda">Send me an NDA first</Label>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button type="reset" variant="ghost">Clear</Button>
          <Button type="submit">Send request</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default function App() {
  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Logo className="text-lg" />
          <ThemeToggle />
        </div>
      </header>

      {/* The one gradient surface on this page (DESIGN.md dose rule). Always dark, so it carries the dark tokens. */}
      <div className="dark overflow-hidden border-b bg-orbit-glow bg-grain text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="max-w-xl">
            <h1 className="text-4xl leading-[1.05] tracking-[-0.03em] sm:text-6xl">Miracle UI</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              The Miracle Labs design system: shadcn/ui components themed with the v6 Orbit identity.
              Copy a component and it already looks like us.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <a href="#components">Browse components</a>
            </Button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <Section title="Brand">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1.4fr]">
            {NEUTRALS.map(([name, cls, hex, role]) => (
              <div key={name} className="overflow-hidden rounded-xl border bg-card">
                <div className={`h-20 border-b ${cls}`} />
                <div className="space-y-0.5 p-3 text-sm">
                  <div className="font-medium">{name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{hex}</div>
                  <div className="text-xs text-muted-foreground">{role}</div>
                </div>
              </div>
            ))}
            <div className="flex flex-col justify-between gap-4 rounded-xl border bg-card p-3 text-sm">
              <div>
                <div className="font-medium">v6 accents</div>
                <div className="text-xs text-muted-foreground">Mark, brand surface glow, orbit CTA border, charts. Never UI chrome.</div>
              </div>
              <div className="space-y-2">
                {ACCENTS.map(([name, cls, hex]) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className={`size-4 rounded-sm ${cls}`} />
                    <span className="text-xs">{name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 rounded-xl border bg-card p-6">
            <Logo className="text-3xl" />
            <Logo tone="current" className="text-3xl" />
            <OrbitMark className="size-12" />
            <OrbitMark small className="size-6" />
            <OrbitMark small tone="current" className="size-4" />
          </div>
        </Section>

        <Section title="Cover · slides, documents, video, web">
          <p className="max-w-2xl text-sm text-muted-foreground">
            The v6 Primary board at full strength. It opens or closes a piece (title slide, document cover, video
            intro and outro, social or OG image). Inside the content, go back to the neutral theme.
          </p>
          <Cover format="Slide, video, web hero" size="16:9 · 1920×1080" aspect="aspect-video" />
          {/* Column widths follow each aspect ratio (A4 = 0.707, square = 1), so both share one height. */}
          <div className="grid max-w-2xl grid-cols-[0.707fr_1fr] items-start gap-4">
            {COVERS.map(([format, size, aspect]) => <Cover key={format} format={format} size={size} aspect={aspect} />)}
          </div>
          <div className="flex flex-wrap gap-2">
            {DOWNLOADS.map(([label, href]) => (
              <Button key={href} variant="outline" size="sm" asChild>
                <a href={href} download>{label}</a>
              </Button>
            ))}
          </div>
        </Section>

        <Section title="Theme tokens">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {SWATCHES.map(([name, cls]) => (
              <div key={name} className="space-y-1.5">
                <div className={`h-14 rounded-lg border ${cls}`} />
                <div className="text-xs text-muted-foreground">{name}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography · Inter Tight">
          <div className="grid gap-6 rounded-xl border bg-card p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
            <div className="space-y-6">
              <div className="text-[9rem] leading-[0.9] font-medium tracking-[-0.04em] sm:text-[12rem]">Aa</div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Family</dt><dd><b className="font-semibold">Inter Tight</b> by Rasmus Andersson &amp; team</dd>
                <dt className="text-muted-foreground">License</dt><dd>SIL Open Font License 1.1 · free for commercial use</dd>
                <dt className="text-muted-foreground">Source</dt>
                <dd><a className="underline underline-offset-4" href="https://fonts.google.com/specimen/Inter+Tight" target="_blank" rel="noreferrer">Google Fonts</a> · copy in FInal Logo v6/font</dd>
                <dt className="text-muted-foreground">Styles</dt><dd>Weights 100 to 900, roman + italic, variable</dd>
                <dt className="text-muted-foreground">Wordmark</dt><dd>Medium 500, all lowercase, tracking -3%</dd>
                <dt className="text-muted-foreground">Fallback</dt><dd>system-ui on the web, Arial in Office files</dd>
              </dl>
            </div>
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Weights</h3>
              <div className="divide-y border-y">
                {WEIGHTS.map(([name, w]) => (
                  <div key={w} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="text-2xl tracking-[-0.02em] sm:text-3xl" style={{ fontWeight: w }}>miracle labs</span>
                    <span className="shrink-0 text-xs text-muted-foreground uppercase tracking-[0.06em]">{name} {w}</span>
                  </div>
                ))}
              </div>
              <h3 className="mt-8 mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Character set</h3>
              <p className="text-xl leading-relaxed tracking-[-0.01em] break-words">
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz
              </p>
              <p className="mt-1 text-xl text-muted-foreground tabular-nums">0123456789 &amp; @ # % ? ! ( ) · →</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border bg-card">
            <div className="hidden grid-cols-[90px_200px_1fr] gap-4 border-b px-6 py-2 text-xs text-muted-foreground sm:grid">
              <span>Style</span><span>Size / line / tracking</span><span>Sample</span>
            </div>
            {TYPE_SCALE.map(([name, size, lh, track, w, sample]) => (
              <div key={name} className="grid items-baseline gap-1 border-b px-6 py-4 last:border-b-0 sm:grid-cols-[90px_200px_1fr] sm:gap-4">
                <span className="text-sm font-medium">{name}</span>
                <span className="font-mono text-xs text-muted-foreground">{size}px · {lh} · {track} · {w}</span>
                <span
                  className="min-w-0 truncate"
                  style={{ fontSize: Math.min(size, 56), lineHeight: lh, fontWeight: w, letterSpacing: track === "0" ? 0 : `${parseFloat(track) / 100}em` }}
                >
                  {sample}
                </span>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {MEDIA.map(([medium, how]) => (
              <div key={medium} className="rounded-xl border bg-card p-4">
                <div className="text-sm font-medium">{medium}</div>
                <p className="mt-1 text-sm text-muted-foreground">{how}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="components" title="Buttons · click to copy">
          <div className="flex flex-wrap items-center gap-3">
            {BUTTONS.map(([variant, label]) => (
              <Button key={variant} variant={variant} onClick={() => copy(`<Button variant="${variant}">${label}</Button>`)}>
                {label}
              </Button>
            ))}
            <Button disabled>Disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {(["xs", "sm", "default", "lg"] as const).map(size => (
              <Button key={size} size={size} onClick={() => copy(`<Button size="${size}">Label</Button>`)}>
                {size === "lg" && <Plus data-icon="inline-start" />}
                {size === "xs" ? "Extra small" : size === "sm" ? "Small" : size === "lg" ? "Large" : "Default"}
              </Button>
            ))}
            <Button size="icon" variant="outline" aria-label="Copy icon button" onClick={() => copy(`<Button size="icon" aria-label="...">…</Button>`)}>
              <Bell />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            <code>orbit</code> is the brand-moment CTA: use it once per screen at most.
          </p>
        </Section>

        <Section title="Badges & alerts">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Live</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Failed</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Alert>
              <Bell />
              <AlertTitle>Informational alert</AlertTitle>
              <AlertDescription>Neutral surface, used for notices that need no action.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Bell />
              <AlertTitle>Destructive alert</AlertTitle>
              <AlertDescription>Say what failed and what to do next.</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Form & overlays">
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectForm />

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Tabs, switches and menus.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="general">
                    <TabsList>
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="team">Team</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="n1">Email notifications</Label>
                        <Switch id="n1" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <Label htmlFor="n2">Weekly digest</Label>
                        <Switch id="n2" />
                      </div>
                    </TabsContent>
                    <TabsContent value="team" className="space-y-3 pt-4">
                      {MEMBERS.map(role => (
                        <div key={role} className="flex items-center gap-3">
                          <Avatar><AvatarFallback>{role[0]}</AvatarFallback></Avatar>
                          <span className="flex-1 text-sm">{role}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm" aria-label={`${role} actions`}><MoreHorizontal /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{role}</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={() => toast(`${role} is now an admin`)}>Make admin</DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => toast(`Invite resent to ${role}`)}>Resend invite</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive" onSelect={() => toast(`${role} removed`)}>Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dialog</CardTitle>
                  <CardDescription>Dialogs use the popover surface and close with Escape.</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Publish project?</DialogTitle>
                        <DialogDescription>Example confirmation. Nothing is published from this page.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                        <DialogClose asChild><Button onClick={() => toast.success("Confirmed")}>Publish</Button></DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}
