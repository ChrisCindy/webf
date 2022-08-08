/*
 * Copyright (C) 2019-2022 The Kraken authors. All rights reserved.
 * Copyright (C) 2022-present The WebF authors. All rights reserved.
 */

#include "task_queue.h"

namespace kraken {

int32_t TaskQueue::registerTask(const Task& task, void* data) {
  std::lock_guard<std::mutex> guard(queue_mutex_);
  auto taskData = new TaskData(task, data);
  m_map[id++] = taskData;
  return id - 1;
}

void TaskQueue::dispatchTask(int32_t taskId) {
  std::lock_guard<std::mutex> guard(queue_mutex_);
  if (m_map.count(taskId) > 0) {
    m_map[taskId]->task(m_map[taskId]->data);
    delete m_map[taskId];
    m_map.erase(taskId);
  }
}

void TaskQueue::flushTask() {
  std::lock_guard<std::mutex> guard(queue_mutex_);
  for (auto& m : m_map) {
    m.second->task(m.second->data);
    delete m.second;
  }
  m_map.clear();
}

}  // namespace kraken
