'use client'

import Image from 'next/image'
import { X, Calendar, Clock, MapPin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ClubDetail {
  name: string
  image: string
  description: string
  meetingDay: string
  meetingTime: string
  location: string
  whatYouLearn: string[]
  capacity: number
  members: number
}

interface EventDetail {
  name: string
  date: string
  time: string
  location: string
  image: string
  detail: string
  capacity: number
  registered: number
  regLink?: string
}

type DetailData =
  | { type: 'club'; data: ClubDetail; isMember: boolean; onJoin: () => void }
  | { type: 'event'; data: EventDetail; isRegistered: boolean; onRegister: () => void }

export function DetailModal({ detail, onClose }: { detail: DetailData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-md items-end justify-center">
      <div className="absolute inset-0 bg-navy/50" onClick={onClose} aria-hidden="true" />
      <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-background pb-8 pt-0 shadow-2xl">
        <Button
          type="button"
          onClick={onClose}
          aria-label="Close"
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 rounded-full bg-navy/40 text-white backdrop-blur-sm hover:bg-navy/60"
        >
          <X className="size-4" aria-hidden="true" />
        </Button>

        {detail.type === 'club' ? (
          <ClubContent club={detail.data} isMember={detail.isMember} onJoin={detail.onJoin} />
        ) : (
          <EventContent event={detail.data} isRegistered={detail.isRegistered} onRegister={detail.onRegister} />
        )}
      </div>
    </div>
  )
}

function ClubContent({ club, isMember, onJoin }: { club: ClubDetail; isMember: boolean; onJoin: () => void }) {
  const spots = club.capacity - club.members - (isMember ? 1 : 0)
  return (
    <>
      <div className="relative h-52 overflow-hidden">
        <Image src={club.image} alt={club.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="px-5 -mt-8 relative z-10">
        <h3 className="font-heading text-xl font-bold text-foreground">ACES {club.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{club.description}</p>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="size-4 text-primary shrink-0" />
            <span>{club.meetingDay}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Clock className="size-4 text-primary shrink-0" />
            <span>{club.meetingTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPin className="size-4 text-primary shrink-0" />
            <span>{club.location}</span>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">What you&apos;ll learn</h4>
          <ul className="mt-2 flex flex-col gap-1.5">
            {club.whatYouLearn.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {club.members} member{club.members !== 1 ? 's' : ''}
            {spots > 0 && ` · ${spots} spot${spots !== 1 ? 's' : ''} left`}
          </span>
        </div>

        <Button
          type="button"
          onClick={onJoin}
          disabled={isMember}
          className="mt-5 w-full rounded-2xl py-3 text-sm font-bold"
        >
          {isMember ? (
            <><Check className="size-4 mr-1.5" /> Already a member</>
          ) : (
            'Join this club'
          )}
        </Button>
      </div>
    </>
  )
}

function EventContent({ event, isRegistered, onRegister }: { event: EventDetail; isRegistered: boolean; onRegister: () => void }) {
  const left = Math.max(0, event.capacity - event.registered - (isRegistered ? 1 : 0))
  const hasRegLink = 'regLink' in event

  return (
    <>
      <div className="relative h-52 overflow-hidden">
        <Image src={event.image} alt={event.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      <div className="px-5 -mt-8 relative z-10">
        <h3 className="font-heading text-xl font-bold text-foreground">{event.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{event.detail}</p>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar className="size-4 text-primary shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Clock className="size-4 text-primary shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPin className="size-4 text-primary shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
          <span className="text-sm text-muted-foreground">
            {event.registered} attending · {left === 0 ? 'Full' : `${left} spot${left !== 1 ? 's' : ''} left`}
          </span>
        </div>

        {hasRegLink ? (
          <a
            href={(event as any).regLink as string}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center rounded-2xl bg-primary py-3 text-sm font-bold text-primary-foreground"
          >
            Register on external site
          </a>
        ) : (
          <Button
            type="button"
            onClick={onRegister}
            disabled={(left === 0 && !isRegistered) || isRegistered}
            className="mt-5 w-full rounded-2xl py-3 text-sm font-bold"
          >
            {isRegistered ? (
              <><Check className="size-4 mr-1.5" /> Registered</>
            ) : (
              'Register for this event'
            )}
          </Button>
        )}
      </div>
    </>
  )
}
