import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  flex: 1;
  width: 100%;
  min-height: 0;
  display: flex;
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const Sidebar = styled.aside`
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #f5f5f7;
  border-right: 1px solid #e5e5ea;
  padding: 12px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 14px;
  border: none;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  font-size: 13px;
  font-weight: 500;
  color: #1d1d1f;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`;

const TodayButton = styled.button`
  width: 100%;
  padding: 6px;
  margin-bottom: 12px;
  border: 1px solid #d1d1d6;
  border-radius: 6px;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f0f0f5;
  }
`;

const MiniMonthLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  color: #1d1d1f;
`;

const MiniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  font-size: 10px;
  text-align: center;
  margin-bottom: 16px;
`;

const MiniDay = styled.button`
  aspect-ratio: 1;
  border: none;
  border-radius: 50%;
  background: ${(props) => {
    if (props.isSelected) return '#007aff';
    if (props.isToday) return '#ff3b30';
    return 'transparent';
  }};
  color: ${(props) => {
    if (props.isSelected || props.isToday) return '#fff';
    if (props.isOtherMonth) return '#c7c7cc';
    return '#1d1d1f';
  }};
  font-size: 10px;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: ${(props) =>
      props.isSelected ? '#007aff' : 'rgba(0, 0, 0, 0.06)'};
  }
`;

const CalendarsLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #86868b;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const CalendarFilter = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  font-size: 13px;
  color: #1d1d1f;
  cursor: pointer;

  input {
    accent-color: ${(props) => props.color};
  }
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #e5e5ea;
  flex-shrink: 0;
`;

const ToolbarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #007aff;
  cursor: pointer;

  &:hover {
    background: #f0f0f5;
  }
`;

const MonthTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #1d1d1f;
  min-width: 180px;
`;

const ViewBadge = styled.span`
  font-size: 12px;
  color: #86868b;
  padding: 4px 10px;
  background: #f0f0f5;
  border-radius: 6px;
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 16px 4px;
  font-size: 11px;
  font-weight: 600;
  color: #86868b;
  text-align: center;
  flex-shrink: 0;
`;

const MonthGrid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 1px;
  background: #e5e5ea;
  border-top: 1px solid #e5e5ea;
`;

const DayCell = styled.button`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 6px 8px;
  border: none;
  background: ${(props) => (props.isSelected ? '#e8f4ff' : '#fff')};
  cursor: pointer;
  text-align: left;
  min-height: 0;
  overflow: hidden;

  &:hover {
    background: ${(props) => (props.isSelected ? '#dceeff' : '#fafafa')};
  }
`;

const DayNumber = styled.span`
  align-self: flex-start;
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 50%;
  font-size: 13px;
  font-weight: ${(props) => (props.isToday || props.isSelected ? 600 : 400)};
  background: ${(props) => {
    if (props.isSelected) return '#007aff';
    if (props.isToday) return '#ff3b30';
    return 'transparent';
  }};
  color: ${(props) =>
    props.isSelected || props.isToday
      ? '#fff'
      : props.isOtherMonth
        ? '#c7c7cc'
        : '#1d1d1f'};
  margin-bottom: 4px;
`;

const EventPill = styled.div`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${(props) => props.color};
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 2px;
`;

const MoreEvents = styled.div`
  font-size: 10px;
  color: #86868b;
  padding-left: 2px;
`;

const DetailPanel = styled.div`
  flex-shrink: 0;
  border-top: 1px solid #e5e5ea;
  padding: 14px 20px;
  background: #fafafa;
  max-height: 140px;
  overflow-y: auto;
`;

const DetailDate = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 10px;
`;

const EventRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const EventDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.color};
  flex-shrink: 0;
`;

const EventInfo = styled.div`
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-size: 13px;
    color: #1d1d1f;
  }

  span {
    font-size: 12px;
    color: #86868b;
  }
`;

const EmptyDay = styled.p`
  margin: 0;
  font-size: 13px;
  color: #86868b;
`;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CALENDARS = [
  { id: 'personal', name: 'Personal', color: '#007aff' },
  { id: 'work', name: 'Work', color: '#34c759' },
  { id: 'family', name: 'Family', color: '#ff9500' },
];

const SAMPLE_EVENTS = [
  { id: 1, title: 'Team standup', date: '2026-05-25', time: '9:00 AM', calendar: 'work' },
  { id: 2, title: 'Lunch with Sam', date: '2026-05-25', time: '12:30 PM', calendar: 'personal' },
  { id: 3, title: 'Project review', date: '2026-05-26', time: '2:00 PM', calendar: 'work' },
  { id: 4, title: "Mom's birthday", date: '2026-05-28', time: 'All day', calendar: 'family' },
  { id: 5, title: 'Gym', date: '2026-05-27', time: '6:00 PM', calendar: 'personal' },
  { id: 6, title: 'Design sync', date: '2026-05-29', time: '11:00 AM', calendar: 'work' },
];

function formatDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildMonthCells(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, otherMonth: true, monthOffset: -1 });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, otherMonth: false, monthOffset: 0 });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ day: nextDay++, otherMonth: true, monthOffset: 1 });
  }
  return cells;
}

function Calendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
  });
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [enabledCals, setEnabledCals] = useState({
    personal: true,
    work: true,
    family: true,
  });
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = buildMonthCells(year, month);

  const monthLabel = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const filteredEvents = useMemo(
    () => events.filter((e) => enabledCals[e.calendar]),
    [events, enabledCals]
  );

  const getEventsForDay = (y, m, d) =>
    filteredEvents.filter((e) => {
      const [ey, em, ed] = e.date.split('-').map(Number);
      return ey === y && em === m + 1 && ed === d;
    });

  const selectedEvents = getEventsForDay(selected.year, selected.month, selected.day);

  const selectDay = (day, otherMonth, monthOffset) => {
    let y = year;
    let m = month;
    if (otherMonth) {
      m += monthOffset;
      if (m < 0) {
        m = 11;
        y -= 1;
      } else if (m > 11) {
        m = 0;
        y += 1;
      }
    }
    setSelected({ year: y, month: m, day });
    if (otherMonth) {
      setViewDate(new Date(y, m, 1));
    }
  };

  const goToday = () => {
    const now = new Date();
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelected({
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
    });
  };

  const changeMonth = (delta) => {
    setViewDate(new Date(year, month + delta, 1));
  };

  const isToday = (day, otherMonth, monthOffset) => {
    let m = month;
    let y = year;
    if (otherMonth) {
      m += monthOffset;
      if (m < 0) {
        m = 11;
        y -= 1;
      } else if (m > 11) {
        m = 0;
        y += 1;
      }
    }
    return (
      day === today.getDate() &&
      m === today.getMonth() &&
      y === today.getFullYear()
    );
  };

  const isSelected = (day, otherMonth, monthOffset) => {
    let m = month;
    let y = year;
    if (otherMonth) {
      m += monthOffset;
      if (m < 0) {
        m = 11;
        y -= 1;
      } else if (m > 11) {
        m = 0;
        y += 1;
      }
    }
    return selected.day === day && selected.month === m && selected.year === y;
  };

  const addEvent = () => {
    if (!newTitle.trim()) return;
    const dateKey = formatDateKey(selected.year, selected.month, selected.day);
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTitle.trim(),
        date: dateKey,
        time: '10:00 AM',
        calendar: 'personal',
      },
    ]);
    setNewTitle('');
    setShowAdd(false);
  };

  const selectedLabel = new Date(
    selected.year,
    selected.month,
    selected.day
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const miniCells = buildMonthCells(year, month);

  return (
    <Container>
      <Sidebar>
        <AddButton type="button" onClick={() => setShowAdd(!showAdd)}>
          <FaPlus size={11} />
          {showAdd ? 'Cancel' : 'New Event'}
        </AddButton>
        {showAdd && (
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Event title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addEvent()}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '8px',
                borderRadius: 6,
                border: '1px solid #d1d1d6',
                fontSize: 13,
                marginBottom: 6,
              }}
            />
            <TodayButton type="button" onClick={addEvent}>
              Add to {selected.day}/{selected.month + 1}
            </TodayButton>
          </div>
        )}
        <TodayButton type="button" onClick={goToday}>
          Today
        </TodayButton>

        <MiniMonthLabel>{monthLabel}</MiniMonthLabel>
        <MiniGrid>
          {WEEKDAYS.map((d) => (
            <span key={d} style={{ color: '#86868b', fontSize: 9 }}>
              {d[0]}
            </span>
          ))}
          {miniCells.map((cell, i) => (
            <MiniDay
              key={i}
              type="button"
              isOtherMonth={cell.otherMonth}
              isToday={isToday(cell.day, cell.otherMonth, cell.monthOffset)}
              isSelected={isSelected(cell.day, cell.otherMonth, cell.monthOffset)}
              onClick={() => selectDay(cell.day, cell.otherMonth, cell.monthOffset)}
            >
              {cell.day}
            </MiniDay>
          ))}
        </MiniGrid>

        <CalendarsLabel>Calendars</CalendarsLabel>
        {CALENDARS.map((cal) => (
          <CalendarFilter key={cal.id} color={cal.color}>
            <input
              type="checkbox"
              checked={enabledCals[cal.id]}
              onChange={() =>
                setEnabledCals((prev) => ({ ...prev, [cal.id]: !prev[cal.id] }))
              }
            />
            {cal.name}
          </CalendarFilter>
        ))}
      </Sidebar>

      <Main>
        <Toolbar>
          <ToolbarLeft>
            <NavButton type="button" onClick={() => changeMonth(-1)} aria-label="Previous">
              <FaChevronLeft size={12} />
            </NavButton>
            <NavButton type="button" onClick={() => changeMonth(1)} aria-label="Next">
              <FaChevronRight size={12} />
            </NavButton>
            <MonthTitle>{monthLabel}</MonthTitle>
          </ToolbarLeft>
          <ViewBadge>Month</ViewBadge>
        </Toolbar>

        <WeekdayRow>
          {WEEKDAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </WeekdayRow>

        <MonthGrid>
          {cells.map((cell, i) => {
            let cellYear = year;
            let cellMonth = month;
            if (cell.otherMonth) {
              cellMonth += cell.monthOffset;
              if (cellMonth < 0) {
                cellMonth = 11;
                cellYear -= 1;
              } else if (cellMonth > 11) {
                cellMonth = 0;
                cellYear += 1;
              }
            }
            const dayEvents = getEventsForDay(cellYear, cellMonth, cell.day);
            const calColor = (id) =>
              CALENDARS.find((c) => c.id === id)?.color || '#007aff';

            return (
              <DayCell
                key={i}
                type="button"
                isSelected={isSelected(
                  cell.day,
                  cell.otherMonth,
                  cell.monthOffset
                )}
                onClick={() =>
                  selectDay(cell.day, cell.otherMonth, cell.monthOffset)
                }
              >
                <DayNumber
                  isToday={isToday(cell.day, cell.otherMonth, cell.monthOffset)}
                  isSelected={isSelected(
                    cell.day,
                    cell.otherMonth,
                    cell.monthOffset
                  )}
                  isOtherMonth={cell.otherMonth}
                >
                  {cell.day}
                </DayNumber>
                {dayEvents.slice(0, 2).map((ev) => (
                  <EventPill key={ev.id} color={calColor(ev.calendar)}>
                    {ev.title}
                  </EventPill>
                ))}
                {dayEvents.length > 2 && (
                  <MoreEvents>+{dayEvents.length - 2} more</MoreEvents>
                )}
              </DayCell>
            );
          })}
        </MonthGrid>

        <DetailPanel>
          <DetailDate>{selectedLabel}</DetailDate>
          {selectedEvents.length === 0 ? (
            <EmptyDay>No events — click New Event to add one.</EmptyDay>
          ) : (
            selectedEvents.map((ev) => {
              const cal = CALENDARS.find((c) => c.id === ev.calendar);
              return (
                <EventRow key={ev.id}>
                  <EventDot color={cal?.color} />
                  <EventInfo>
                    <strong>{ev.title}</strong>
                    <span>
                      {ev.time} · {cal?.name}
                    </span>
                  </EventInfo>
                </EventRow>
              );
            })
          )}
        </DetailPanel>
      </Main>
    </Container>
  );
}

export default Calendar;