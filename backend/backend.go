package backend

import (
	"context"
)

const defaultHours = 1
const defaultMinutes = 0
const defaultTimerActive = true

type Backend struct {
	hours       int
	minutes     int
	timerActive bool
	ctx         context.Context
}

func NewBackend() *Backend {
	return &Backend{
		hours:       defaultHours,
		minutes:     defaultMinutes,
		timerActive: defaultTimerActive,
	}
}

func (b *Backend) Startup(ctx context.Context) {
	b.ctx = ctx
}

func (b *Backend) Hours() int {
	return b.hours
}

func (b *Backend) SetHours(hours int) {
	b.hours = hours
}

func (b *Backend) Minutes() int {
	return b.minutes
}

func (b *Backend) SetMinutes(minutes int) {
	b.minutes = minutes
}

func (b *Backend) TimerActive() bool {
	return b.timerActive
}

func (b *Backend) SetTimerActive(timerActive bool) {
	b.timerActive = timerActive
}
